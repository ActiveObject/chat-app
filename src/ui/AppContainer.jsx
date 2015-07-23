import React from 'react'
import app from 'app'
import RoomList from 'app/ui/RoomList'
import Chat from 'app/ui/Chat'
import currentUser from 'app/identities/currentUser'
import * as Github from 'app/Github'
import { add, valueOf } from 'app/core/IdentityStore'

var ChatSearch = React.createClass({
  render: function () {
    return (
      <div className='chat-search'>
        <input type='text' className='chat-search__input' placeholder='Search' />
      </div>
    )
  }
})

var Login = React.createClass({
  render: function () {
    return (
      <div className='login'>
        <div className='login__image'>
          <img src='images/github.png' width={128} height={128} />
        </div>
        <span className='login__text' onClick={this.auth}>
          Login with your github account
        </span>
      </div>
    )
  },

  auth: function () {
    Github.auth(app)
      .then(user => app.push(add(app, user)))
      .catch(err => console.log(err))
  }
})

export default React.createClass({
  render: function () {

    return (
      <div className='app-container'>
        <div className='app-container__layer app-container__bg'></div>
        <div className='app-container__layer app-container__fg'>
          {this.renderRoute()}
        </div>
      </div>
    )
  },

  renderRoute: function () {
    var user = valueOf(app, currentUser)

    if (user.status === 'unauthenticated') {
      return (
        <div className='app-container__outlet'>
          <Login/>
        </div>
      )
    }

    return (
      <div className='app-container__outlet'>
        <div className='app-container__sidebar'>
          <div className='app-container__sidebar-header'>
            <ChatSearch />
          </div>
          <div className='app-container__sidebar-body'>
            <RoomList/>
          </div>
          <div className='app-container__sidebar-footer'></div>
        </div>

        <Chat/>
      </div>
    )
  }
})
