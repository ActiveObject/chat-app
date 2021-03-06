import merge from 'app/core/merge'

export default function addTag(x, tag) {
  if (typeof x !== 'object' || x === null) {
    throw new TypeError('addTag does not support non-object values');
  }

  if (!x.tag) {
    return merge(x, { tag: tag })
  }

  if (Array.isArray(x.tag)) {
    return merge(x, {
      tag: x.tag.filter(t => t !== tag).concat(tag)
    })
  }

  return merge(x, {
    tag: [x.tag, tag]
  })
}