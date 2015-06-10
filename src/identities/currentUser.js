import { createIdentity } from 'app/core/IdentityStore'
import User from 'app/values/User'

var john = new User({
  nickname: 'john',
  firstName: 'Johnes',
  lastName: 'James',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattchevy/48.jpg'
});

export default createIdentity(':app/currentUser', john, function(currentUser, v) {
  if (v instanceof User && v.nickname === user.nickname) {
    return v;
  }

  return currentUser;
})
