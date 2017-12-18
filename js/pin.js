'use strict';
(function () {
  var activePin = null;
  var pinSize = 46;
  var mainPinSize = 62;
  var pinTail = 18;
  var drawButton = function (pin) {
    var buttonMap = document.createElement('button');
    var imgAvatar = document.createElement('img');
    buttonMap.setAttribute('data-id', pin.id);
    buttonMap.className = 'map__pin';
    buttonMap.style.left = pin.location.x + 'px';
    buttonMap.style.top = pin.location.y - pinSize / 2 + pinTail + 'px';
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
    size: pinSize,
    mainSize: mainPinSize,
    activate: activate,
    deactivate: deactivate,
    drawButton: drawButton
  };
})();
