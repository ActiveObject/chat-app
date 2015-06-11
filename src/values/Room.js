import merge from 'app/fn/merge'
import Message from 'app/values/Message'

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

Room.prototype.modify = function(attrs) {
  return new Room(merge(this, attrs))
}

export default Room;
