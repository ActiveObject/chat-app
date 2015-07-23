import React from 'react'
import cx from 'classnames'
import app from 'app'
import activeRoom from 'app/identities/activeRoom'
import * as Room from 'app/Room'
import { add, valueOf } from 'app/core/IdentityStore'

export default React.createClass({
  render: function() {
    var picture = this.props.room.members.rest().first().picture
    var nickname = this.props.room.members.rest().first().nickname
    var room = valueOf(app, activeRoom)
    var classList = cx({
      'room-list-item': true,
      'room-list-item--active': room && room.id === this.props.room.id
    })

    return (
      <div className={classList} onClick={this.changeActiveRoom}>
        <div className='room-list-item__avatar'>
          <img width='40' height='40' src={picture} alt={nickname} />
        </div>
        <div className='room-list-item__content'>
          <div className='room-list-item__top'>
            <div className='room-list-item__members'>Corey and Frank</div>
            <div className='room-list-item__time'>2:49 pm</div>
          </div>
          <div className='room-list-item__text'>I always thought itd be nice if...</div>
        </div>
      </div>
    )
  },

  changeActiveRoom: function () {
    app.push(add(app, Room.activate(this.props.room)))
  }
})