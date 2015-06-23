module.exports = function merge(...objs) {
  return objs.reduce(function(acc, obj) {
    Object.keys(obj).forEach(function(key) {
      acc[key] = obj[key]
    })

    return acc
  }, {})
}
