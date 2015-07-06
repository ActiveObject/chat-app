import tagOf from 'app/core/tagOf'
import * as Room from 'app/values/Room'

export default function(xs, v) {
  if (tagOf(v) === ':app/room') {
    var ids = xs.map(room => room.id)

    if (ids.indexOf(v.id) !== -1) {
      return xs.map(room => room.id === v.id ? v : room)
    }

    return xs.concat(v)
  }

  if (tagOf(v) === ':app/message') {
    return xs.map(room => Room.addMessage(room, v))
  }

  return xs
}
