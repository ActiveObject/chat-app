import React from 'react'
import RoomList from 'app/ui/RoomList'
import Chat from 'app/ui/Chat'

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

            <Chat/>
          </div>
        </div>
      </div>
    )
  }
})
