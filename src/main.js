import React from 'react'
import {Set, List} from 'immutable'
import AppContainer from 'app/ui/AppContainer'
import vbus from 'app/vbus'
import Room from 'app/values/Room'
import User from 'app/values/User'
import Message from 'app/values/Message'
import app from 'app'

import rooms from 'app/identities/rooms'
import currentUser from 'app/identities/currentUser'
import activeRoom from 'app/identities/activeRoom'

import 'app/styles/main.css'
import 'app/styles/app-container.css'
import 'app/styles/room-list-item.css'
import 'app/styles/chat-search.css'
import 'app/styles/new-message-view.css'
import 'app/styles/message.css'

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
  author: john,
  time: new Date('2015-01-01T00:00:02Z')
});

var msg2 = new Message({
  text: 'Happy New Year too!',
  author: casey,
  time: new Date('2015-01-01T00:10:00Z')
});

var msg3 = new Message({
  text: 'In Back to the Future, Doc states that the time machine is electrical but that he needs a nuclear reaction (produced by plutioum stolen from a group of Libyan terroists) to generate the 1.21 gigawatts of electricity needed.',
  author: john,
  time: new Date('2015-01-01T00:10:00Z')
});

var room1 = new Room({
  id: 1,
  members: Set.of(john, casey),
  history: List.of(msg1, msg2, msg3),
  isEnabledNotification: true
});

var room2 = new Room({
  id: 2,
  members: Set.of(john, bejamin),
  history: List.of(msg1, msg2),
  isEnabledNotification: true
});

var room3 = new Room({
  id: 3,
  members: Set.of(john, megan),
  history: List.of(msg1, msg2),
  isEnabledNotification: true
});

var room4 = new Room({
  id: 4,
  members: Set.of(megan, casey),
  history: List.of(msg1, msg2),
  isEnabledNotification: true
});

vbus.map(changeRecord => changeRecord.value).log()
vbus.map(changeRecord => changeRecord.db.toJS()).log()

app.addIdentity(rooms)
app.addIdentity(currentUser)
app.addIdentity(activeRoom)

vbus.onValue(changeRecord => app.notify(changeRecord.db))

React.render(React.createElement(AppContainer), document.getElementById('app'))

vbus.push(app.add(room1))
vbus.push(app.add(room2))
vbus.push(app.add(room3))
vbus.push(app.add({ type: ':app/active-room', room: room2 }))

setTimeout(function() {
  vbus.push(app.add(room4))
}, 2000)
