"""Pinned ONNX inference. No network is permitted or attempted during a query."""
import hashlib
import importlib.util
import json
import os
from functools import lru_cache
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
MANIFEST=json.loads(Path(__file__).with_name('model-manifest.json').read_text())
MODEL_VERSION=MANIFEST['model']+'@'+MANIFEST['revision']+':mean-l2-256-v1'

class Unavailable(Exception): pass

def model_dir(): return Path(os.environ.get('HEADSTART_EMBEDDING_DIR',ROOT/'.cache/retrieval/model'))

def availability():
    root=model_dir()
    if not all(importlib.util.find_spec(name) for name in ['numpy','onnxruntime','tokenizers']): return 'optional_model_dependencies_missing'
    try:
        for name,entry in MANIFEST['files'].items():
            path=root/name
            if not path.is_file():return 'local_model_missing'
            if path.stat().st_size!=entry['bytes']:return 'model_version_mismatch'
            if file_digest(str(path),path.stat().st_mtime_ns)!=entry['sha256']:return 'model_version_mismatch'
    except OSError:return 'local_model_unreadable'
    return None

@lru_cache(maxsize=16)
def file_digest(path,modified):
    with open(path,'rb') as handle:return hashlib.file_digest(handle,'sha256').hexdigest()

@lru_cache(maxsize=2)
def session(directory):
    import onnxruntime as ort
    from tokenizers import Tokenizer
    tokenizer=Tokenizer.from_file(str(Path(directory)/'tokenizer.json'))
    tokenizer.enable_truncation(max_length=256);tokenizer.enable_padding()
    options=ort.SessionOptions();options.intra_op_num_threads=2;options.inter_op_num_threads=1
    runtime=ort.InferenceSession(str(Path(directory)/'model.onnx'),sess_options=options,providers=['CPUExecutionProvider'])
    return tokenizer,runtime

def encode(texts):
    reason=availability()
    if reason:raise Unavailable(reason)
    import numpy as np
    try:
        tokenizer,runtime=session(str(model_dir()))
        vectors=[]
        for start in range(0,len(texts),16):
            batch=tokenizer.encode_batch([str(text)[:12000] for text in texts[start:start+16]])
            inputs={'input_ids':np.array([item.ids for item in batch],dtype=np.int64),'attention_mask':np.array([item.attention_mask for item in batch],dtype=np.int64),'token_type_ids':np.array([item.type_ids for item in batch],dtype=np.int64)}
            tokens=runtime.run(None,{entry.name:inputs[entry.name] for entry in runtime.get_inputs()})[0]
            mask=inputs['attention_mask'][...,None]
            mean=(tokens*mask).sum(axis=1)/np.maximum(mask.sum(axis=1),1e-9)
            normalized=mean/np.maximum(np.linalg.norm(mean,axis=1,keepdims=True),1e-9)
            if normalized.shape[1]!=MANIFEST['dimension'] or not np.isfinite(normalized).all():raise Unavailable('model_output_mismatch')
            vectors.extend(normalized.tolist())
        return vectors
    except Unavailable:raise
    except Exception as exc:raise Unavailable('local_model_inference_failed') from exc
