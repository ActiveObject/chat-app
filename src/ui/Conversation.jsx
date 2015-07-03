import React from 'react'
import activeRoom from 'app/identities/activeRoom'
import * as Message from 'app/values/Message'

export default React.createClass({
  componentWillMount: function () {
    this.unsub = app.listen(activeRoom, () => this.forceUpdate())
  },

  componentWillUnmount: function () {
    this.unsub()
  },

  render: function () {
    var room = app.valueOf(activeRoom)
    var history = room ? room.history : []
    var messages = history.map(Message.render)

    return (
      <div className='conversation'>{messages}</div>
    )
  }
})
