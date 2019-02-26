import Backbone from 'backbone';
import _ from 'underscore';

const LocalStorage = _.extend({}, Backbone.Events);

// Add convenience JSON parse/stringigy functions to Global
LocalStorage.setItem = function (key, obj) {
  window.localStorage.setItem(key, JSON.stringify(obj));
  LocalStorage.trigger('localstorage:set:' + key, obj);
};

LocalStorage.getItem = function (key) {
  const str = window.localStorage.getItem(key);
  if (str) {
    return JSON.parse(str);
  }
};

LocalStorage.hasItem = function (key) {
  return window.localStorage.hasOwnProperty(key);
};

LocalStorage.removeItem = function (key) {
  window.localStorage.removeItem(key);
  LocalStorage.trigger('localstorage:remove:' + key);
};

export default LocalStorage;
