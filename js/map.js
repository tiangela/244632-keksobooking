'use strict';
(function () {
  var KEY_ESC = 27;
  var PIN_Y_SHIFT = 55;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var fieldset = document.querySelectorAll('fieldset');
  var blockPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  window.offers = null;

  var fillMap = function (data) {
    for (var i = 0; i < data.length; i++) {
      var drawPin = window.pin.drawButton(data[i]);
      fragment.appendChild(drawPin);
      if (i > 4) {
        drawPin.classList.add('hidden');
      }
    }
    blockPins.appendChild(fragment);
  };

  var getInitialCoordsPinMain = function () {
    var styles = getComputedStyle(pinMain);
    var coords = ('x: ' + parseInt(styles.left, 10) + ',' + ' y: ' + (parseInt(styles.top, 10) + PIN_Y_SHIFT));
    return coords;
  };

  var onPinsRender = function (data) {
    window.offers = data;
    window.offers.forEach(function (offer, index) {
      offer.id = index;
    });

    fillMap(data);

    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var l = 0; l < pins.length; l++) {
      pins[l].addEventListener('click', onPinClick);
    }

    for (var t = 0; t < fieldset.length; t++) {
      fieldset[t].classList.remove('disabled');
    }

    map.classList.remove('map--faded');
    notice.classList.remove('notice__form--disabled');
    pinMain.addEventListener('mousedown', onMainPinMousedown);
  };

  var onPinMouseup = function () {
    var coordsPinMain = getInitialCoordsPinMain();
    window.form.setAddress(coordsPinMain);
    window.backend.load(onPinsRender, window.backend.onError);
    pinMain.removeEventListener('mouseup', onPinMouseup);
  };

  var onPinClick = function (evt) {
    var target = evt.currentTarget;
    var idPin = target.dataset.id;
    window.pin.activate(target);
    window.card.show(window.offers[idPin], map);
    var closeBtn = window.card.getCloseBtn();
    document.addEventListener('keydown', onButtonClose);
    closeBtn.addEventListener('click', onCloseClick);
  };

/*  var onMainPinClick = function () {
    var coordsPinMain = getInitialCoordsPinMain();
    window.form.setAddress(coordsPinMain);
  };
  pinMain.addEventListener('click', onMainPinClick);*/

  var onButtonClose = function (event) {
    if (event.keyCode === KEY_ESC) {
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
      if (nextY >= 100 - PIN_Y_SHIFT && nextY <= 500 - PIN_Y_SHIFT) {
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
      var coordX = pinMain.offsetTop;
      var coordY = pinMain.offsetTop + PIN_Y_SHIFT;
      window.form.setAddress('x: ' + coordX + ',' + ' y: ' + coordY);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mouseup', onPinMouseup);

})();
