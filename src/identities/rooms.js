import { createIdentity } from 'app/core/IdentityStore'
import Room from 'app/values/Room'
import Message from 'app/values/Message'

export default createIdentity(':app/rooms', [], function(xs, v) {
  if (v instanceof Room) {
    var ids = xs.map(room => room.id)

    if (ids.indexOf(v.id) !== -1) {
      return xs.map(room => room.id === v.id ? v : room)
    }

    return xs.concat(v)
  }

  if (v instanceof Message) {
    return xs.map(room => v.room === room.id ? room.addMessage(v) : room)
  }

  return xs
})
