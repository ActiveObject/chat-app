export var IStart = Symbol('Runtime.IStart')
export var IStop = Symbol('Runtime.IStop')

function Runtime() {
  this.start = function (system) {
    Object.setPrototypeOf(this, system)
  }
}

export default Runtime