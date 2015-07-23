export var IVmap = Symbol('IdentityStore.IVmap')
export var IIdentityStore = Symbol('IdentityStore.IIdentityStore')

export function add(target, v) {
  var vmap = target[IVmap]
  var identities = target[IIdentityStore]

  return {
    value: v,
    db: identities.reduce(function(valueMap, idRecord) {
      var identityState = valueMap.get(idRecord[0])
      var nextState = idRecord[1](identityState, v, valueMap)

      return valueMap.set(idRecord[0], nextState)
    }, vmap)
  }
}

export function valueOf(target, identity, defValue) {
  var identity = target[IIdentityStore].filter(v => v[1] === identity)[0]
  return target[IVmap].get(identity[0], defValue)
}