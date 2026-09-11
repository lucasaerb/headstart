# Independent media approval request

Review the exact 16-row batch in [`media-approval-request.json`](media-approval-request.json) against the matching entries in `research/catalog/media-manifest.json` and the local files under `research/catalog/media/`. Inspect animated GIFs at their beginning, middle, and end.

For every row, set `decision` to `approved_for_local_catalog_display` only if the exact image is authentic game media, matches its alt text and project identity, and its source, credit, digest, and narrow display scope are accurate. Fill an independent reviewer identity, timezone-aware `reviewed_at`, and a verdict beginning with `PASS`. Any rejection should remain rejected and the batch must not publish as a whole.

Apply a completed decision file without overwriting the canonical manifest first:

```sh
python3 research/catalog/scripts/recent_media_approval.py \
  --approval docs/reviews/recent-vibe-games/media-approval-request.json \
  --output /tmp/approved-recent-media-manifest.json
```

After independent approval, replace the canonical manifest with the validated output, rebuild the research exports and site projection, regenerate the contact sheet/credits, and rerun all tests. Until then, all 16 rows remain `candidate_local_display_pending_independent_review` and are excluded from the dashboard/API projection.
