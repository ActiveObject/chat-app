import React from 'react'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import app from 'app'
import rooms from 'app/identities/rooms'
import 'app/styles/transition/fadein.css'


export default React.createClass({
  componentWillMount: function() {
    this.unsub = app.listen(rooms, () => this.forceUpdate());
  },

  componentWillUnmount: function() {
    this.unsub();
  },

  render: function() {
    var roomList = app.valueOf(rooms).map((room, i) => room.renderListItem(i))

    return (
      <div className='room-list'>
        <TransitionGroup transitionName='fadein'>{roomList}</TransitionGroup>
      </div>
    );
  }
})
