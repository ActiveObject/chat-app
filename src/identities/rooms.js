import { createIdentity } from 'app/core/IdentityStore'
import tagOf from 'app/core/tagOf'
import Room from 'app/values/Room'
import Message from 'app/values/Message'

export default createIdentity(':app/rooms', [], function(xs, v) {
  if (tagOf(v) === ':app/room') {
    var ids = xs.map(room => room.id)

    if (ids.indexOf(v.id) !== -1) {
      return xs.map(room => room.id === v.id ? new Room(v) : room)
    }

    return xs.concat(new Room(v))
  }

  if (tagOf(v) === ':app/message') {
    return xs.map(room => room.addMessage(v))
  }

  return xs
})
