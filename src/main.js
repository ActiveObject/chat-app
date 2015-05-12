import React from 'react'
import {Set, List} from 'immutable'
import AppContainer from 'app/ui/AppContainer'
import vbus from 'app/vbus'
import Room from 'app/values/Room'
import User from 'app/values/User'
import Message from 'app/values/Message'
import 'app/styles/main.css'

React.render(React.createElement(AppContainer), document.getElementById('app'));

var john = new User({
  nickname: 'john',
  firstName: 'John',
  lastName: 'Smith'
});

var casey = new User({
  nickname: 'casey',
  firstName: 'Casey',
  lastName: 'James'
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

vbus.log();
vbus.push([':app/rooms', List.of(room1)]);
