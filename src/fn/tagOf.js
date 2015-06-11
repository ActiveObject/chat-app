export default function tagOf(v) {
  if (Array.isArray(v)) {
    return v[0];
  }

  if (typeof v.tag === 'string') {
    return v.tag;
  }

  if (typeof v.tag === 'function') {
    return v.tag();
  }
}
