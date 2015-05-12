import React from 'react'
import RoomList from 'app/ui/RoomList'
import Conversation from 'app/ui/Conversation'
import NewMessageView from 'app/ui/NewMessageView'

var ChatSearch = React.createClass({
  render: function () {
    return (
      <div className='chat-search'>
        <input type='text' className='chat-search__input' placeholder='Search' />
      </div>
    )
  }
})

export default React.createClass({
  render: function () {
    return (
      <div className='app-container'>
        <div className='app-container__layer app-container__bg'></div>
        <div className='app-container__layer app-container__fg'>
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

            <div className='app-container__content'>
              <div className='app-container__content-header'></div>

              <div className='app-container__content-body'>
                <Conversation />
              </div>

              <div className='app-container__content-footer'>
                <NewMessageView />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
