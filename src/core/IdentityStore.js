export var IVmap = Symbol('IdentityStore.IVmap')
export var IIdentityStore = Symbol('IdentityStore.IIdentityStore')
export var ICallbackStore = Symbol('IdentityStore.ICallbackStore')


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

export function addWatch(target, identity, callback) {
  var cmap = target[ICallbackStore]

  if (!cmap.has(identity)) {
    cmap.set(identity, [])
  }

  cmap.get(identity).push(callback)
}

export function notify(target, vmap) {
  var cmap = target[ICallbackStore]
  var imap = target[IIdentityStore]

  target[IVmap] = vmap
  target[IIdentityStore].forEach(function (identityRecord) {
    var [key, identity] = identityRecord
    var callbacks = cmap.get(identity)

    if (Array.isArray(callbacks)) {
      callbacks.forEach(callback => callback(vmap.get(key)))
    }
  })
}

export function valueOf(target, identity, defValue) {
  var identity = target[IIdentityStore].filter(v => v[1] === identity)[0]
  return target[IVmap].get(identity[0], defValue)
}