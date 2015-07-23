import React from 'react'
import activeRoom from 'app/identities/activeRoom'
import * as Message from 'app/Message'
import { add, valueOf } from 'app/core/IdentityStore'
import app from 'app'

export default React.createClass({
  render: function () {
    var room = valueOf(app, activeRoom)
    var history = room ? room.history : []
    var messages = history.map(Message.render)

    return (
      <div className='conversation'>{messages}</div>
    )
  }
})
