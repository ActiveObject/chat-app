function IdentityStore(attrs) {
  this.identities = attrs.identities
  this.callbacks = attrs.callbacks
  this.valueMap = attrs.valueMap
}

IdentityStore.prototype.addIdentity = function(v) {
  return new IdentityStore({
    identities: this.identities.concat(v),
    valueMap: this.valueMap.set(v.id, v.seed),
    callbacks: this.callbacks
  })
};

IdentityStore.prototype.listen = function(identity, callbackFn) {
  this.callbacks.push([identity.id, callbackFn])
}

IdentityStore.prototype.add = function(v) {
  return {
    value: v,
    db: this.identities.reduce(function(valueMap, idRecord) {
      var identityState = valueMap.get(idRecord.id);
      var nextState = idRecord.next(identityState, v, valueMap);
      return valueMap.set(idRecord.id, nextState);
    }, this.valueMap)
  }
}

IdentityStore.prototype.valueOf = function(identity, defValue) {
  return this.valueMap.get(identity.id, defValue)
}

IdentityStore.prototype.notify = function(dbValue) {
  this.valueMap = dbValue
  this.callbacks.forEach(cbRecord => cbRecord[1](this.valueMap.get(cbRecord[0])));
}

export function createStore(valueMap) {
  return new IdentityStore({
    identities: [],
    callbacks: [],
    valueMap: valueMap
  })
}

export function createIdentity(id, seed, next) {
  return {
    id: id,
    seed: seed,
    next: next
  }
}
