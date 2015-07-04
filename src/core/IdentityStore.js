export var IVmap = Symbol('IdentityStore.IVmap')
export var IIdentityStore = Symbol('IdentityStore.IIdentityStore')
export var ICallbackStore = Symbol('IdentityStore.ICallbackStore')


export function createIdentity(id, seed, next) {
  return {
    id: id,
    seed: seed,
    next: next
  }
}

export function add(target, v) {
  var vmap = target[IVmap]
  var identities = target[IIdentityStore]

  return {
    value: v,
    db: identities.reduce(function(valueMap, idRecord) {
      var identityState = valueMap.get(idRecord.id)
      var nextState = idRecord.next(identityState, v, valueMap)

      return valueMap.set(idRecord.id, nextState)
    }, vmap)
  }
}

export function addWatch(target, identity, callback) {
  target[ICallbackStore].push([identity.id, callback])
}

export function notify(target, vmap) {
  target[IVmap] = vmap
  target[ICallbackStore].forEach(cbRecord => cbRecord[1](vmap.get(cbRecord[0])))
}

export function valueOf(target, identity, defValue) {
  return target[IVmap].get(identity.id, defValue)
}