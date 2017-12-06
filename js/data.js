'use strict';

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
var map = document.querySelector('.map');
var activePin = null;
var currentPopup = null;
var getRandomValue = function (minRandom, maxRandom) {
  return Math.round(Math.random() * (maxRandom - minRandom) + minRandom);
};
var pinMain = map.querySelector('.map__pin--main');
var notice = document.querySelector('.notice');
var fieldset = document.querySelectorAll('fieldset');

var getRandomArray = function (arr) {
  var copiedArray = arr.slice();
  var randomLength = getRandomValue(0, arr.length);
  copiedArray.length = randomLength;
  return copiedArray;
};
