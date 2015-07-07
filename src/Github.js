export let IAuth = Symbol('Github.IAuth')

/**
 * Authenticated the system user using github as provider
 * @param {Object} system
 * @return {Promise<User>}
 */
export function auth(system) {
  if (typeof system[IAuth] !== 'function') {
    throw new TypeError('Object does not support Github.IAuth protocol')
  }

  return system[IAuth]()
}