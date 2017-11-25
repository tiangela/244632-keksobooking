'use strict';

var ads = [];
var homeTypeNames = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var types = ['flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var profilePhotos = generatePhotos(8);

var x = null;
var y = null;
var getRandomValue = function(minRandom, maxRandom) {
  return Math.random() * (maxRandom - minRandom) + minRandom;
};
for (var i = 0; i < 8; i++) {
  x = getRandomValue(300, 900);
  y = getRandomValue(100, 500);
  ads[i] = {
    'author': {
      'avatar': profilePhotos[i]
    },
    'offer': {
      'title': homeTypeNames[i],
      'address': x + ', ' + y,
      'price': getRandomValue(1000, 1000000),
      'type': types[0],
      'rooms': getRandomValue(1, 5),
      'guests': getRandomValue(1, 10),
      'checkin': checkins[getRandomValue(0, checkins.length - 1)],
      'checkout': checkouts[getRandomValue(0, checkouts.length - 1)],
      'features': getRandomArray(features),
      'description': '',
      'photos': []
    },
    'location': {
      x: x,
      y: y
    }
  };
}

var blockPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var drawButton = function(ad) {
  var buttonMap = document.createElement('button');
  var imgAvatar = document.createElement('img');
  buttonMap.className = 'map__pin';
  buttonMap.style.left = ad.location.x;
  buttonMap.style.top = ad.location.y;
  imgAvatar.src = ad.author.avatar;
  imgAvatar.style.width = '40px';
  imgAvatar.style.height = '40px';
  imgAvatar.draggable = 'false';
  buttonMap.appendChild(imgAvatar);
  fragment.appendChild(buttonMap);
  return buttonMap;
};
blockPins.appendChild(fragment);
drawButton(ads[i]);
