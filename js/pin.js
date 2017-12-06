'use strict';

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
