import merge from 'app/fn/merge'

function Room(attrs) {
  this.id = attrs.id;
  this.history = attrs.history;
  this.members = attrs.members;
  this.isNotificationEnabled = attrs.isNotificationEnabled;
}

Room.prototype.addMessage = function(msg) {
  return this.modify({
    history: this.history.concat(msg)
  })
}

Room.prototype.modify = function(attrs) {
  return new Room(merge(this, attrs))
}

export default Room;
