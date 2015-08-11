import * as Room from 'app/Room'
import hasTag from 'app/core/hasTag'

export default function(activeRoom, v) {
  if (hasTag(v, ':room/active')) {
    return v
  }

  if (hasTag(v, ':app/message')) {
    return Room.addMessage(activeRoom, v)
  }

  return activeRoom
}
