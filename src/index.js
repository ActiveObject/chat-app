import Bacon from 'baconjs'

let vbus = new Bacon.Bus()

vbus.map(changeRecord => changeRecord.value).log('value')
vbus.map(changeRecord => changeRecord.db.toJS()).log('db')

let app = {
  start: function (system) {
    let systems = vbus.scan(system.start(), (system, { db }) => system.use(db))

    this.unsub1 = systems.onValue(system => Object.setPrototypeOf(this, system))
    this.unsub2 = systems.onValue(system => system.render())
  },

  stop: function () {
    this.unsub1()
    this.unsub2()
  },

  push: function (v) {
    vbus.push(v)
  }
}

export default app