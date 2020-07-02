'use strict';

(function () {

  var loadData = function (onSuccess, onError, url) {
    var StatusCode = {
      OK: 200,
    };
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания истекло');
    });
    xhr.timeout = 10000;
    xhr.open('GET', url);
    xhr.send();
  };
  window.load = {
    loadData: loadData
  };
})();

