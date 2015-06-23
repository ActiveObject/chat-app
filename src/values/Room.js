import merge from 'app/fn/merge'
import Message from 'app/values/Message'
import RoomListItem from 'app/ui/RoomListItem'

function Room(attrs) {
  this.id = attrs.id;
  this.history = attrs.history;
  this.members = attrs.members;
  this.isNotificationEnabled = attrs.isNotificationEnabled;
}

Room.prototype.addMessage = function(msg) {
  if (msg.room === this.id) {
    return this.modify({
      history: this.history.concat(new Message(msg))
    })
  }

  return this
}

Room.prototype.renderListItem = function (key) {
  return React.createElement(RoomListItem, {
    key: key,
    room: this
  })
}

Room.prototype.modify = function(attrs) {
  return new Room(merge(this, attrs))
}

export default Room;
