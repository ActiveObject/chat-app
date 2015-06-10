import { createIdentity } from 'app/core/IdentityStore'
import Room from 'app/values/Room'

export default createIdentity(':app/rooms', [], function(xs, v) {
  if (v instanceof Room) {
    return xs.concat(v)
  }

  return xs
})
