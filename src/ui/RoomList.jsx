import React from 'react'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import app from 'app'
import rooms from 'app/identities/rooms'
import * as Room from 'app/Room'
import { add, valueOf } from 'app/core/IdentityStore'
import 'app/styles/transition/fadein.css'


export default React.createClass({
  render: function() {
    var roomList = valueOf(app, rooms).map(Room.renderListItem)

    return (
      <div className='room-list'>
        <TransitionGroup transitionName='fadein'>{roomList}</TransitionGroup>
      </div>
    );
  }
})
