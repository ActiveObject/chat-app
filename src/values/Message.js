import React from 'react'
import MessageView from 'app/ui/Message'

function Message(attrs) {
  this.text = attrs.text
  this.author = attrs.author
  this.time = attrs.time
  this.room = attrs.room
}

Message.prototype.render = function (key) {
  return React.createElement(MessageView, {
    key: key,
    msg: this
  })
}

export default Message
