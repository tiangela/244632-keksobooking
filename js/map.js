'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var notice = document.querySelector('.notice');
  var fieldset = document.querySelectorAll('fieldset');

  var fillMap = function () {
    var blockPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.length; j++) {
      fragment.appendChild(window.pin.drawButton(window.data[j]));
    }
    blockPins.appendChild(fragment);
  };
  var onPinMouseup = function () {
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
    map.addEventListener('keydown', onButtonClose);
    pinMain.removeEventListener('mouseup', onPinMouseup);
  };

  var onButtonClose = function (event) {
    if (event.keyCode === 27) {
      window.pin.deactivate();
      window.card.closePopup(map);
    }
  };

  var onPinClick = function (evn) {
    var target = evn.currentTarget;
    var idPin = target.dataset.id;
    window.pin.activate(target);
    window.card.showPopup(window.data[idPin], map);
    var closeBtn = window.card.getCloseBtn();
    closeBtn.addEventListener('click', onCloseClick);
  };

  var onCloseClick = function () {
    window.pin.deactivate();
    window.card.closePopup(map);
  };

  pinMain.addEventListener('mouseup', onPinMouseup);
})();
