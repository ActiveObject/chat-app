export var IStart = Symbol('Runtime.IStart')
export var IStop = Symbol('Runtime.IStop')
export var IPush = Symbol('Runtime.IPush')

function Runtime() {
  this.start = function (system) {
    Object.setPrototypeOf(this, system)
    system[IStart]()
  }
}

export function push(system, v) {
  system[IPush](v)
}

export default Runtime