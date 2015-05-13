import React from 'react'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import {List} from 'immutable'
import rooms from 'app/entities/rooms'
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
          <div className='room-list-item__text'>I always thought it'd be nice if...</div>
        </div>
      </div>
    )
  }
});

export default React.createClass({
  getInitialState: function() {
    return {
      rooms: List()
    }
  },

  componentWillMount: function() {
    this.unsub = rooms.onValue(vs => this.setState({ rooms: vs }));
  },

  componentWillUnmount: function() {
    this.unsub();
  },

  render: function() {
    var rooms = this.state.rooms.map(function(room, i) {
      return <RoomListItem key={i} room={room} />;
    });

    return (
      <div className='room-list'>
        <TransitionGroup transitionName='fadein'>{rooms}</TransitionGroup>
      </div>
    );
  }
})
