import { Map } from 'immutable'

function IdentityStore() {
  this.identities = []
  this.callbacks = [];
  this.store = Map()
}

IdentityStore.prototype.addIdentity = function(v) {
  this.identities.push(v)
  this.store = this.store.set(v.id, v.seed)
};

IdentityStore.prototype.listen = function(identity, callbackFn) {
  this.callbacks.push([identity.id, callbackFn])
}

IdentityStore.prototype.add = function(v) {
  return this.identities.reduce(function(store, idRecord) {
    var identityState = store.get(idRecord.id);
    var nextState = idRecord.next(identityState, v, store);
    return store.set(idRecord.id, nextState);
  }, this.store);
}

IdentityStore.prototype.valueOf = function(identity, defValue) {
  return this.store.get(identity.id, defValue)
}

IdentityStore.prototype.notify = function(dbValue) {
  this.store = dbValue
  this.callbacks.forEach(cbRecord => cbRecord[1](this.store.get(cbRecord[0])));
}

export function createStore() {
  return new IdentityStore()
}

export function createIdentity(id, seed, next) {
  return {
    id: id,
    seed: seed,
    next: next
  }
}
