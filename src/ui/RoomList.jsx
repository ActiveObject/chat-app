import React from 'react'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import app from 'app'
import rooms from 'app/identities/rooms'
import 'app/styles/transition/fadein.css'

var RoomListItem = React.createClass({
  render: function() {
    var picture = this.props.room.members.rest().first().picture,
        nickname = this.props.room.members.rest().first().nickname;

    return (
      <div className='room-list-item'>
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
  }
});

export default React.createClass({
  componentWillMount: function() {
    this.unsub = app.listen(rooms, () => this.forceUpdate());
  },

  componentWillUnmount: function() {
    this.unsub();
  },

  render: function() {
    var roomList = app.valueOf(rooms).map(function(room, i) {
      return <RoomListItem key={i} room={room} />;
    });

    return (
      <div className='room-list'>
        <TransitionGroup transitionName='fadein'>{roomList}</TransitionGroup>
      </div>
    );
  }
})
