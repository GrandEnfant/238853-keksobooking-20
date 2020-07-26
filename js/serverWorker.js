'use strict';

(function () {
  var TIMEOUT = 10000;
  var URL_SEND = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200,
  };

  var createRequest = function (onSuccess, onError) {
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
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var loadData = function (onSuccess, onError, url) {
    var xhr = createRequest(onSuccess, onError, url);
    xhr.open('GET', url);
    xhr.send();
  };

  var sendData = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError, URL_SEND);
    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  window.serverWorker = {
    loadData: loadData,
    sendData: sendData,
  };
})();

