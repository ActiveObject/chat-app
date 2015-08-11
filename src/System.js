import React from 'react'
import Firebase from 'firebase'
import * as Github from 'app/Github'
import * as IdentityStore from 'app/core/IdentityStore'
import AppContainer from 'app/ui/AppContainer'
import merge from 'app/core/merge'

import rooms from 'app/identities/rooms'
import currentUser from 'app/identities/currentUser'
import activeRoom from 'app/identities/activeRoom'

function System(attrs) {
  this.firebase = attrs.firebase
  this.rootEl = attrs.rootEl
  this.dbRef = attrs.dbRef
  this.value = attrs.value

  this[IdentityStore.IVmap] = this.value;
  this[IdentityStore.IIdentityStore] = [
    [':app/rooms', rooms],
    [':app/currentUser', currentUser],
    [':app/activeRoom', activeRoom]
  ]
}

System.prototype.use = function (db) {
  return new System(merge(this, {
    value: db
  }))
}

System.prototype.start = function () {
  return new System(merge(this, {
    dbRef: new Firebase(this.firebase)
  }))
}

System.prototype.render = function () {
  React.render(React.createElement(AppContainer), this.rootEl)
}

System.prototype[Github.IAuth] = function () {
  var dbRef = this.dbRef

  return new Promise(function (resolve, reject) {
    dbRef.authWithOAuthPopup('github', function (err, authData) {
      if (err) {
        return reject(err)
      }

      resolve({
        tag: [':app/user', ':user/authenticated', ':user/current'],
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