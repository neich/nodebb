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
      success: df.resolve.bind(df),
      error: df.reject.bind(df)
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
      success: df.resolve.bind(df),
      error: df.reject.bind(df)
    });
    return df.promise;
  }

  Api.getOrders = function (data) {
    var df = P.defer();
    var token = (localStorage.getItem('user') || {jwt: ''}).jwt;
    $.ajax({
      url: '/api/users/self/orders',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      processData: false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: df.resolve.bind(df),
      error: df.reject.bind(df)
    });
    return df.promise;
  }

  return Api;
});
