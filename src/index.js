import { Map } from 'immutable'
import Firebase from 'firebase'
import { createStore } from 'app/core/IdentityStore'
import * as Github from 'app/github'

let dbRef = new Firebase('https://ac-chat-app.firebaseio.com')
let store = createStore(Map())

store[Github.IAuth] = function () {
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

export default store
