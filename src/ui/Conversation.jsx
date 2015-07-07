import React from 'react'
import activeRoom from 'app/identities/activeRoom'
import * as Message from 'app/Message'
import { add, addWatch, valueOf } from 'app/core/IdentityStore'
import app from 'app'

export default React.createClass({
  componentWillMount: function () {
    this.unsub = addWatch(app, activeRoom, () => this.forceUpdate())
  },

  componentWillUnmount: function () {
    this.unsub()
  },

  render: function () {
    var room = valueOf(app, activeRoom)
    var history = room ? room.history : []
    var messages = history.map(Message.render)

    return (
      <div className='conversation'>{messages}</div>
    )
  }
})
