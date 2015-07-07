import React from 'react'
import Message from 'app/ui/Message'

export function render(msg) {
  return React.createElement(Message, {
    key: msg.id,
    value: msg
  })
}
