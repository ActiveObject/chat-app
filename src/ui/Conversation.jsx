import React from 'react'
import app from 'app'
import activeRoom from 'app/identities/activeRoom'

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
    var messages = history.map((msg, i) => msg.render(i))

    return (
      <div className='conversation'>{messages}</div>
    )
  }
})
