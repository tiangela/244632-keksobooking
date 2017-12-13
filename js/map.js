'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var fieldset = document.querySelectorAll('fieldset');
  var blockPins = document.querySelector('.map__pins');
  //  var fragment = document.createDocumentFragment();

  //var fillMap = function () {
  /*  for (var j = 0; j < window.data.ads.length; j++) {
      fragment.appendChild(window.pin.drawButton(window.data.ads[j]));
    }
    blockPins.appendChild(fragment);
  };*/
  var onMessageError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }
  var onAdRender = function (ad) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ad.length; i++) {
      fragment.appendChild(window.pin.drawButton(ads[i]));
    }
    blockPins.appendChild(fragment);
  };

  window.backend.load(onAdRender, onMessageError);

  var getInitialCoordsPinMain = function () {
    var styles = getComputedStyle(pinMain);
    var coords = ('x: ' + parseInt(styles.left, 10) + ',' + ' y: ' + parseInt(styles.top, 10));
    return coords;
  };
  var coordsPinMain = getInitialCoordsPinMain();

  var onPinMouseup = function () {
    map.classList.remove('map--faded');
    notice.classList.remove('notice__form--disabled');
    for (var t = 0; t < fieldset.length; t++) {
      fieldset[t].classList.remove('disabled');
    }
  //  fillMap();
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var l = 0; l < pins.length; l++) {
      pins[l].addEventListener('click', onPinClick);
    }
    window.form.setAddress(coordsPinMain);
    pinMain.removeEventListener('mouseup', onPinMouseup);
    pinMain.addEventListener('mousedown', onMainPinMousedown);
  };

  var onPinClick = function (evn) {
    var target = evn.currentTarget;
    var idPin = target.dataset.id;
    window.pin.activate(target);
    window.card.show(window.data.ads[idPin], map);
    var closeBtn = window.card.getCloseBtn();
    document.addEventListener('keydown', onButtonClose);
    closeBtn.addEventListener('click', onCloseClick);
  };

  var onButtonClose = function (event) {
    if (event.keyCode === 27) {
      window.pin.deactivate();
      window.card.closePopup(map);
      document.removeEventListener('keydown', onButtonClose);
    }
  };

  var onCloseClick = function () {
    window.pin.deactivate();
    window.card.closePopup(map);
    document.removeEventListener('keydown', onButtonClose);
  };


  pinMain.addEventListener('mouseup', onPinMouseup);

  var onMainPinMousedown = function (evt) {
    evt.preventDefault();
    pinMain.style.zIndex = 1000;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var nextY = pinMain.offsetTop - shift.y;
      if (nextY >= 100 && nextY <= 500) {
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var coordX = parseInt(pinMain.style.left, 10);
      var coordY = parseInt(pinMain.style.top + window.pin.mainSize / 2 + 22, 10);
      window.form.setAddress('x: ' + coordX + ',' + ' y: ' + coordY);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
