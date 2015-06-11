import { createIdentity } from 'app/core/IdentityStore'
import Message from 'app/values/Message'
import Room from 'app/values/Room'
import tagOf from 'app/fn/tagOf'

export default createIdentity(':app/active-room', null, function(activeRoom, v) {
  if (tagOf(v) === ':app/active-room') {
    return new Room(v.value)
  }

  if (tagOf(v) === ':app/message') {
    return activeRoom.addMessage(v)
  }

  return activeRoom
})
