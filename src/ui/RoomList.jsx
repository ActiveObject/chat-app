import React from 'react'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import app from 'app'
import cx from 'classnames'
import vbus from 'app/vbus'
import rooms from 'app/identities/rooms'
import activeRoom from 'app/identities/activeRoom'
import 'app/styles/transition/fadein.css'

var RoomListItem = React.createClass({
  componentWillMount: function () {
    this.unsub = app.listen(activeRoom, () => this.forceUpdate())
  },

  componentWillUnmount: function () {
    this.unsub()
  },

  render: function() {
    var picture = this.props.room.members.rest().first().picture,
        nickname = this.props.room.members.rest().first().nickname,
        room = app.valueOf(activeRoom),
        classList = cx({
          'room-list-item': true,
          'room-list-item--active': room && room.id === this.props.room.id
        });

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
    vbus.push(app.add({ tag: ':app/active-room', value: this.props.room }))
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
