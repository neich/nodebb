var localStorage = _.extend({}, Backbone.Events)

// Add convenience JSON parse/stringigy functions to Global
localStorage.setItem = function (key, obj) {
  window.localStorage.setItem(key, JSON.stringify(obj))
  localStorage.trigger('localstorage:set:' + key, obj)
}

localStorage.getItem = function (key) {
  var str = window.localStorage.getItem(key)
  if (str) {
    return JSON.parse(str)
  }
}

localStorage.hasItem = function (key) {
  return window.localStorage.hasOwnProperty(key)
}

localStorage.removeItem = function (key) {
  window.localStorage.removeItem(key)
  localStorage.trigger('localstorage:remove:' + key)
}

module.exports = localStorage
