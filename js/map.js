'use strict';
(function() {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var fieldset = document.querySelectorAll('fieldset');
  var address = document.querySelectorAll('#address');

  var fillMap = function() {
    var blockPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.length; j++) {
      fragment.appendChild(window.pin.drawButton(window.data[j]));
    }
    blockPins.appendChild(fragment);
  };
  var onPinMouseup = function() {
    map.classList.remove('map--faded');
    notice.classList.remove('notice__form--disabled');
    for (var t = 0; t < fieldset.length; t++) {
      fieldset[t].classList.remove('disabled');
    }
    fillMap();
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var l = 0; l < pins.length; l++) {
      pins[l].addEventListener('click', onPinClick);
    }
    pinMain.removeEventListener('mouseup', onPinMouseup);
    pinMain.addEventListener('mousedown', onPinMousedown);
  };


  var onPinClick = function (evn) {
    var target = evn.currentTarget;
    var idPin = target.dataset.id;
    window.pin.activate(target);
    window.card.showPopup(window.data[idPin], map);
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
pinMain.removeEventListener('mousedown', onPinMousedown);

  var onPinMousedown = function (e) {
    e.preventDefault();
    pinMain.style.zIndex = 1000;

    var coords = getCoords(pinMain);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    var moveAt = function (evn) {
      pinMain.style.left = evn.pageX - shiftX + 'px';
      pinMain.style.top = evn.pageY - shiftY + 'px';
    };

    var coordX = null;
    var coordY = null;

    var setCoords = function () {
      coordX = pinMain.style.left;
      coordY = pinMain.style.top;
    };

    moveAt(e);
    var onMouseMove = function (onEvn) {
      onEvn.preventDefault();
      moveAt(onEvn);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.ondragstart = function () {
    return false;
  };
  var getCoords = function (elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

})();
