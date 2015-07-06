import React from 'react'
import Bacon from 'baconjs'
import { Map } from 'immutable'
import Firebase from 'firebase'
import { createStore } from 'app/core/IdentityStore'
import * as Github from 'app/github'
import * as Runtime from 'app/core/Runtime'
import * as IdentityStore from 'app/core/IdentityStore'
import AppContainer from 'app/ui/AppContainer'

import rooms from 'app/identities/rooms'
import currentUser from 'app/identities/currentUser'
import activeRoom from 'app/identities/activeRoom'

function System(config) {
  this.firebase = config.firebase
}

System.prototype[Runtime.IStart] = function () {
  this.dbRef = new Firebase(this.firebase)
  this[IdentityStore.ICallbackStore] = new WeakMap()

  this[IdentityStore.IVmap] = Map({
    ':app/rooms': [],
    ':app/currentUser': {
      tag: ':app/user',
      status: 'unauthenticated',
      current: true
    },
    ':app/activeRoom': null
  })

  this[IdentityStore.IIdentityStore] = [
    [':app/rooms', rooms],
    [':app/currentUser', currentUser],
    [':app/activeRoom', activeRoom]
  ];

  this.vbus = new Bacon.Bus()
  this.unsub = this.vbus.onValue(changeRecord => IdentityStore.notify(this, changeRecord.db))
  React.render(React.createElement(AppContainer), document.getElementById('app'))
}

System.prototype[Runtime.IStop] = function () {
  this.unsub()
}

System.prototype[Runtime.IPush] = function (v) {
  this.vbus.push(v)
}

System.prototype[Github.IAuth] = function () {
  var dbRef = this.dbRef

  return new Promise(function (resolve, reject) {
    dbRef.authWithOAuthPopup('github', function (err, authData) {
      if (err) {
        return reject(err)
      }

      resolve({
        tag: ':app/user',
        isCurrent: true,
        uid: authData.uid,
        username: authData.github.username,
        displayName: authData.github.displayName,
        profile: authData.github.cachedUserProfile,
        email: authData.github.email
      })
    })
  })
}

export default System