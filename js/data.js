'use strict';

(function () {

  var HOME_TYPE_NAMES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var COORD_X_MIN = 300;
  var COORD_X_MAX = 900;
  var COORD_Y_MIN = 100;
  var COORD_Y_MAX = 500;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var ads = [];

  var getRandomValue = function (minRandom, maxRandom) {
    return Math.round(Math.random() * (maxRandom - minRandom) + minRandom);
  };
  var getRandomArray = function (arr) {
    var copiedArray = arr.slice();
    var randomLength = getRandomValue(0, arr.length);
    copiedArray.length = randomLength;
    return copiedArray;
  };

  var x = null;
  var y = null;
  for (var i = 0; i < 8; i++) {
    x = getRandomValue(COORD_X_MIN, COORD_X_MAX);
    y = getRandomValue(COORD_Y_MIN, COORD_Y_MAX);
    ads[i] = {
      'id': i,
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': HOME_TYPE_NAMES[i],
        'address': x + ', ' + y,
        'price': getRandomValue(PRICE_MIN, PRICE_MAX),
        'type': TYPES[getRandomValue(0, TYPES.length - 1)],
        'rooms': getRandomValue(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomValue(GUESTS_MIN, GUESTS_MAX),
        'checkin': CHECKINS[getRandomValue(0, CHECKINS.length - 1)],
        'checkout': CHECKOUTS[getRandomValue(0, CHECKOUTS.length - 1)],
        'features': getRandomArray(FEATURES),
        'description': '',
        'photos': []
      },
      'location': {
        x: x,
        y: y
      }
    };
  }
  window.data = {
    ads: ads,
    getRandomValue: getRandomValue
  };
})();
