import { createIdentity } from 'app/core/IdentityStore'
import Message from 'app/values/Message'
import Room from 'app/values/Room'

export default createIdentity(':app/activeRoom', null, function(activeRoom, v) {
  if (v instanceof Room) {
    return v
  }

  if (v instanceof Message) {
    return activeRoom.addMessage(v)
  }

  return activeRoom
})
