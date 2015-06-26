import merge from 'app/core/merge'
import RoomListItem from 'app/ui/RoomListItem'

export function addMessage(room, msg) {
  if (msg.room === room.id) {
    return merge(room, {
      history: room.history.concat(msg)
    })
  }

  return room
}

export function activate(room) {
  return {
    tag: ':app/active-room',
    value: room
  }
}

export function renderListItem(room) {
  return React.createElement(RoomListItem, {
    key: room.id,
    room: room
  })
}
