import * as Room from 'app/values/Room'
import tagOf from 'app/core/tagOf'

export default function(activeRoom, v) {
  if (tagOf(v) === ':app/active-room') {
    return v.value
  }

  if (tagOf(v) === ':app/message') {
    return Room.addMessage(activeRoom, v)
  }

  return activeRoom
}
