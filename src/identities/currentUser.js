import { createIdentity } from 'app/core/IdentityStore'
import tagOf from 'app/fn/tagOf'
import User from 'app/values/User'

var john = new User({
  nickname: 'john',
  firstName: 'Johnes',
  lastName: 'James',
  picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/mattchevy/48.jpg'
});

export default createIdentity(':app/currentUser', john, function(currentUser, v) {
  if (tagOf(v) === ':app/user' && v.nickname === user.nickname) {
    return new User(v);
  }

  return currentUser;
})
