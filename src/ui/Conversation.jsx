import React from 'react'
import vbus from 'app/vbus'

var Message = React.createClass({
  render: function () {
    var msg = this.props.value;

    return (
      <div className='message'>
        <div className='message__avatar'>
          <img width='40' height='40' src={msg.author.picture} alt={msg.author.nickname} />
        </div>
        <div className='message__content'>
          <div className='message__top'>
            <div className='message__author'>{`${msg.author.firstName} ${msg.author.lastName}`}</div>
            <div className='message__time'>2:49 pm</div>
          </div>
          <div className='message__text'>{msg.text}</div>
        </div>
      </div>
    )
  }
})

export default React.createClass({
  componentWillMount: function () {
    this.unsub = vbus.onValue(app => this.setState({ room: app.rooms[0] }))
  },

  componentWillUnmount: function () {
    this.unsub()
  },

  render: function () {
    if (!this.state || !this.state.room) {
      return <div className='conversation'></div>;
    }

    var messages = this.state.room.history.map(function (msg) {
      return <Message value={msg} />
    })

    return (
      <div className='conversation'>{messages}</div>
    )
  }
})
