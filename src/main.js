import {Set, List, Map} from 'immutable'
import app from 'app'
import System from 'app/System'
import { add } from 'app/core/IdentityStore'

import 'app/styles/main.css'
import 'app/styles/app-container.css'
import 'app/styles/room-list-item.css'
import 'app/styles/chat-search.css'
import 'app/styles/new-message-view.css'
import 'app/styles/message.css'
import 'app/styles/login.css'

var system = new System({
  firebase: 'https://ac-chat-app.firebaseio.com',
  rootEl: document.getElementById('app'),
  value: Map({
    ':app/rooms': [],
    ':app/currentUser': {
      tag: ':app/user',
      status: 'unauthenticated',
      current: true
    },
    ':app/activeRoom': null
  })
})

app.start(system)

// ------ Data -------

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

app.push(add(app, {
  tag: ':app/room',
  id: 1,
  members: Set.of(john, casey),
  history: List(),
  isEnabledNotification: true,
}))

app.push(add(app, {
  tag: ':app/room',
  id: 2,
  members: Set.of(john, bejamin),
  history: List(),
  isEnabledNotification: true
}))

setTimeout(function() {
  app.push(add(app, {
    tag: ':app/room',
    id: 4,
    members: Set.of(megan, casey),
    history: List(),
    isEnabledNotification: true
  }))
}, 10000)
