import React from 'react'
import {Set, List} from 'immutable'
import AppContainer from 'app/ui/AppContainer'
import vbus from 'app/vbus'
import Room from 'app/values/Room'
import User from 'app/values/User'
import Message from 'app/values/Message'

import 'app/styles/main.css'
import 'app/styles/app-container.css'
import 'app/styles/room-list-item.css'

React.render(React.createElement(AppContainer), document.getElementById('app'));

var john = new User({
  nickname: 'john',
  firstName: 'John',
  lastName: 'Smith',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/gerrenlamson/48.jpg'
});

var casey = new User({
  nickname: 'casey',
  firstName: 'Casey',
  lastName: 'James',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattchevy/48.jpg'
});

var bejamin = new User({
  nickname: 'bejamin',
  firstName: 'Benjamin',
  lastName: 'Franklin',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/48.jpg'
});

var megan = new User({
  nickname: 'megan',
  firstName: 'Megan',
  lastName: 'Fox',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/48.jpg'
});

var msg1 = new Message({
  text: 'Happy New Year!',
  owner: john,
  time: new Date('2015-01-01T00:00:02Z')
});

var msg2 = new Message({
  text: 'Happy New Year too!',
  owner: casey,
  time: new Date('2015-01-01T00:10:00Z')
});

var room1 = new Room({
  members: Set.of(john, casey),
  history: List.of(msg1, msg2),
  isEnabledNotification: true
});

var room2 = new Room({
  members: Set.of(john, bejamin),
  history: List.of(msg1, msg2),
  isEnabledNotification: true
});

var room3 = new Room({
  members: Set.of(john, megan),
  history: List.of(msg1, msg2),
  isEnabledNotification: true
});

vbus.log();
vbus.push([':app/rooms', List.of(room1, room2)]);

setTimeout(function() {
  vbus.push([':app/rooms', List.of(room1, room2, room3)]);
}, 2000)

setTimeout(function() {
  vbus.push([':app/rooms', List.of(room1, room2, room3, room1)]);
}, 3000)
