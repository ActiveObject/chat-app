export let IConsoleLog = Symbol('IConsoleLog')

export default function log(...vs) {
  let valuesToShow = vs.map(function (v) {
    if (typeof v === 'object' && v[IConsoleLog]) {
      return v[IConsoleLog]()
    }

    return v
  })

  console.log.apply(console, valuesToShow)
}
