'use strict';

(function () {

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
    x = getRandomValue(300, 900);
    y = getRandomValue(100, 500);
    ads[i] = {
      'id': i,
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': homeTypeNames[i],
        'address': x + ', ' + y,
        'price': getRandomValue(1000, 1000000),
        'type': types[getRandomValue(0, types.length - 1)],
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
  window.data = ads;
})();
