import hasTag from 'app/core/hasTag'

let unauthenticated = {
  tag: [':app/user', ':user/current']
}

export default function(currentUser = unauthenticated, v) {
  return hasTag(v, [':app/user', ':user/current']) ? v : currentUser
}
