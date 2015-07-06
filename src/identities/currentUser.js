import tagOf from 'app/core/tagOf'

let unauthenticated = {
  tag: ':app/user',
  status: 'unauthenticated',
  current: true
}

export default function(currentUser = unauthenticated, v) {
  if (tagOf(v) === ':app/user' && v.isCurrent) {
    return v
  }

  return currentUser
}
