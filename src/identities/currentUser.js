import { createIdentity } from 'app/core/IdentityStore'
import tagOf from 'app/core/tagOf'

let unauthenticated = {
  tag: ':app/user',
  status: 'unauthenticated',
  current: true
}

export default createIdentity(':app/currentUser', unauthenticated, function(currentUser, v) {
  if (tagOf(v) === ':app/user' && v.isCurrent) {
    return v
  }

  return currentUser
})
