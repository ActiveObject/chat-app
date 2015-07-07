import {Set, List} from 'immutable'
import app from 'app'
import System from 'app/System'
import { push } from 'app/core/Runtime'
import { add } from 'app/core/IdentityStore'

import 'app/styles/main.css'
import 'app/styles/app-container.css'
import 'app/styles/room-list-item.css'
import 'app/styles/chat-search.css'
import 'app/styles/new-message-view.css'
import 'app/styles/message.css'
import 'app/styles/login.css'

var system = new System({
  firebase: 'https://ac-chat-app.firebaseio.com'
})

app.start(system)

app.vbus.map(changeRecord => changeRecord.value).log('value')
app.vbus.map(changeRecord => changeRecord.db.toJS()).log('db')

var john = {
  tag: ':app/user',
  nickname: 'john',
  firstName: 'John',
  lastName: 'Smith',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/gerrenlamson/48.jpg'
}

var casey = {
  tag: ':app/user',
  nickname: 'casey',
  firstName: 'Casey',
  lastName: 'James',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattchevy/48.jpg'
}

var bejamin = {
  tag: ':app/user',
  nickname: 'bejamin',
  firstName: 'Benjamin',
  lastName: 'Franklin',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/48.jpg'
}

var megan = {
  tag: ':app/user',
  nickname: 'megan',
  firstName: 'Megan',
  lastName: 'Fox',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/48.jpg'
}


push(app, add(app, {
  tag: ':app/room',
  id: 1,
  members: Set.of(john, casey),
  history: List(),
  isEnabledNotification: true,
}))

// vbus.push(add(app, ({
//   tag: ':app/room',
//   id: 2,
//   members: Set.of(john, bejamin),
//   history: List(),
//   isEnabledNotification: true
// }))

// vbus.push(add(app, ({
//   tag: ':app/room',
//   id: 3,
//   members: Set.of(john, megan),
//   history: List(),
//   isEnabledNotification: true
// }))

// vbus.push(add(app, ({
//   tag: ':app/active-room',
//   value: {
//     tag: ':app/room',
//     id: 2,
//     members: Set.of(megan, casey),
//     history: List(),
//     isEnabledNotification: true
//   }
// }))

// vbus.push(add(app, ({
//   tag: ':app/message',
//   text: 'Happy New Year!',
//   author: john,
//   time: new Date('2015-01-01T00:00:02Z'),
//   room: 1
// }))

// vbus.push(add(app, ({
//   tag: ':app/message',
//   text: 'Happy New Year too!',
//   author: casey,
//   time: new Date('2015-01-01T00:10:00Z'),
//   room: 1
// }))

// vbus.push(add(app, ({
//   tag: ':app/message',
//   text: 'In Back to the Future, Doc states that the time machine is electrical but that he needs a nuclear reaction (produced by plutioum stolen from a group of Libyan terroists) to generate the 1.21 gigawatts of electricity needed.',
//   author: john,
//   time: new Date('2015-01-01T00:10:00Z'),
//   room: 1
// }))

// vbus.push(add(app, ({
//   tag: ':app/message',
//   text: 'In Back to the Future, Doc states that the time machine is electrical but that he needs a nuclear reaction (produced by plutioum stolen from a group of Libyan terroists) to generate the 1.21 gigawatts of electricity needed.',
//   author: john,
//   time: new Date('2015-01-01T00:10:00Z'),
//   room: 2
// }))

// setTimeout(function() {
//   vbus.push(add(app, ({
//     tag: ':app/room',
//     id: 4,
//     members: Set.of(megan, casey),
//     history: List(),
//     isEnabledNotification: true
//   }))
// }, 2000)
