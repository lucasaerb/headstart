"""Compatibility helper: never restore records excluded by publication gates."""
from urllib.parse import urlparse, quote


def include_missing_references(projection, research):
    return list(projection)
