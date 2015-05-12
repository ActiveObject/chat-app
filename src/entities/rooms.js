import {List} from 'immutable'
import vbus from 'app/vbus'
import tagOf from 'app/fn/tagOf'

export default vbus
  .filter(v => tagOf(v) === ':app/rooms')
  .map(v => v[1])
  .toProperty(List())
