import React from 'react'
import Bacon from 'baconjs'
import { Map } from 'immutable'
import Firebase from 'firebase'
import { createStore } from 'app/core/IdentityStore'
import * as Github from 'app/github'
import * as Runtime from 'app/core/runtime'

import rooms from 'app/identities/rooms'
import currentUser from 'app/identities/currentUser'
import activeRoom from 'app/identities/activeRoom'

function System(config) {
  this.firebase = config.firebase
}

System.prototype[Runtime.IStart] = function () {
  this.dbRef = new Firebase(this.firebase)
  this[ICallbackStore] = []
  this[IVmap] = Map()
  this[IIdentities] = [rooms, currentUser, activeRoom]
  this[IVbus] = new Bacon.Bus()
  this.unsub = this[IVbus].onValue(changeRecord => app.notify(changeRecord.db))
  React.render(React.createElement(AppContainer), document.getElementById('app'))
}

System.prototype[Runtime.IStop] = function () {
  this.unsub()
}

System.prototype[Github.IAuth] = function () {
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