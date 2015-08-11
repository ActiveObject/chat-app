import hasTag from 'app/core/hasTag'
import * as Room from 'app/Room'

export default function(xs, v) {
  if (hasTag(v, ':app/room')) {
    var ids = xs.map(room => room.id)

    if (ids.indexOf(v.id) !== -1) {
      return xs.map(room => room.id === v.id ? v : room)
    }

    return xs.concat(v)
  }

  if (hasTag(v, ':app/message')) {
    return xs.map(room => Room.addMessage(room, v))
  }

  return xs
}
