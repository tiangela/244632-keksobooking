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
      'avatar': 'img/avatars/user0' +  (i + 1) + '.png'
    },
    'offer': {
      'title': homeTypeNames[i],
      'address': x + ', ' + y,
      'price': getRandomValue(1000, 1000000),
      'type': types[i],
      'rooms': getRandomValue(1, 5),
      'guests': getRandomValue(1, 10),
      'checkin': checkins[getRandomValue(0, checkins.length - 1)],
      'checkout': checkouts[getRandomValue(0, checkouts.length - 1)],
      'features': features,
      'description': '',
      'photos': []
    },
    'location': {
      x: x,
      y: y
    }
  };
}



var drawButton = function(ad) {
  var buttonMap = document.createElement('button');
  var imgAvatar = document.createElement('img');
  buttonMap.className = 'map__pin';
  buttonMap.style.left = ad.location.x + 'px';
  buttonMap.style.top = ad.location.y + 'px';
  imgAvatar.src = ad.author.avatar;
  imgAvatar.style.width = '40px';
  imgAvatar.style.height = '40px';
  imgAvatar.draggable = 'false';
  buttonMap.appendChild(imgAvatar);
  return buttonMap;
};

var fillMap = function () {
  var blockPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(drawButton(ads[i]));
  }
  blockPins.appendChild(fragment);
};

fillMap();
drawButton(ads[i]);
