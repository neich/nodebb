define(['jquery', 'promises'], function ($, P) {
  var Api = {};

  Api.login = function (data) {
    var df = P.defer();
    $.ajax({
      url: '/api/users/login',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      processData: false,
      success: df.resolve,
      error: df.reject
    });
    return df.promise;
  }

  Api.signup = function (data) {
    var df = P.defer();
    $.ajax({
      url: '/api/users',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      processData: false,
      success: df.resolve,
      error: df.reject
    });
    return df.promise;
  }

  Api.getOrders = function () {
    var df = P.defer();
    var user = Backbone.localStorage.getItem('user');
    if (!user) { return df.reject(new Error("API call needs user authenticated")) }
    var token = user.jwt;
    $.ajax({
      url: '/api/users/self/orders',
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      processData: false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: df.resolve,
      error: df.reject
    });
    return df.promise;
  }

  return Api;
});
