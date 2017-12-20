'use strict';
(function () {

  var PIN_SIZE = 46;
  var MAIN_PIN_SIZE = 62;
  var PIN_TAIL = 18;
  var MAIN_PIN_TAIL = 22;
  var activePin = null;

  var drawButton = function (pin) {
    var buttonMap = document.createElement('button');
    var imgAvatar = document.createElement('img');
    buttonMap.setAttribute('data-id', pin.id);
    buttonMap.className = 'map__pin';
    buttonMap.style.left = pin.location.x + 'px';
    buttonMap.style.top = pin.location.y - PIN_SIZE / 2 + PIN_TAIL + 'px';
    imgAvatar.src = pin.author.avatar;
    imgAvatar.style.width = '40px';
    imgAvatar.style.height = '40px';
    imgAvatar.draggable = 'false';
    buttonMap.appendChild(imgAvatar);
    return buttonMap;
  };
  var activate = function (pin) {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    activePin = pin;
    activePin.classList.add('map__pin--active');
  };
  var deactivate = function () {
    activePin.classList.remove('map__pin--active');
  };

  window.pin = {
    active: activePin,
    size: PIN_SIZE,
    mainSize: MAIN_PIN_SIZE,
    mainTile: MAIN_PIN_TAIL,
    activate: activate,
    deactivate: deactivate,
    drawButton: drawButton
  };
})();
