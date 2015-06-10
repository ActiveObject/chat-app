import { createIdentity } from 'app/core/IdentityStore'
import Message from 'app/values/Message'
import Room from 'app/values/Room'

export default createIdentity(':app/active-room', null, function(activeRoom, v) {
  if (v.type === ':app/active-room') {
    return v.room
  }

  if (v instanceof Message) {
    return activeRoom.addMessage(v)
  }

  if (v instanceof Room && activeRoom && activeRoom.id === v.id) {
    return v
  }

  return activeRoom
})
