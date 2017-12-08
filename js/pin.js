'use strict';
(function () {
  var activePin = null;
  var drawButton = function (pin) {
    var pinSize = 46;
    var buttonMap = document.createElement('button');
    var imgAvatar = document.createElement('img');
    buttonMap.setAttribute('data-id', pin.id);
    buttonMap.className = 'map__pin';
    buttonMap.style.left = pin.location.x + 'px';
    buttonMap.style.top = (pin.location.y - (pinSize + 18) / 2) + 'px';
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
    activate: activate,
    deactivate: deactivate,
    drawButton: drawButton
  };
})();