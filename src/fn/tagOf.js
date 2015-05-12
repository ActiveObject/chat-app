export default function tagOf(v) {
  if (Array.isArray(v)) {
    return v[0];
  }

  if (typeof v.tag === 'function') {
    return v.tag();
  }

  throw new Error(`Unknown application value: ${Object.prototype.toString.call(v)}`);
}
