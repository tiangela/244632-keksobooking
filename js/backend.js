'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var onMessageError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background: -webkit-linear-gradient(97deg, rgb(222, 233, 243), rgb(32, 44, 122)); background: linear-gradient(97deg, rgb(222, 233, 243), rgb(32, 44, 122))';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, 4000);
  };

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    onError = onMessageError;
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения!' + ' (>﹏<)');
      }
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс!' + '  (ᵔ.ᵔ)');
    });

    xhr.timeout = 10000; // 10s

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    onError: onMessageError
  };
})();
