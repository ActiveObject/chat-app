import { createIdentity } from 'app/core/IdentityStore'
import * as Room from 'app/values/Room'
import tagOf from 'app/core/tagOf'

export default createIdentity(':app/active-room', null, function(activeRoom, v) {
  if (tagOf(v) === ':app/active-room') {
    return v.value
  }

  if (tagOf(v) === ':app/message') {
    return Room.addMessage(activeRoom, v)
  }

  return activeRoom
})
