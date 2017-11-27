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

var getRandomValue = function(minRandom, maxRandom) {
  return Math.round(Math.random() * (maxRandom - minRandom) + minRandom);
};

var getRandomArray = function(arr) {
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
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
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

var drawButton = function(ad) {
  var pinSize = 46;
  var buttonMap = document.createElement('button');
  var imgAvatar = document.createElement('img');
  buttonMap.className = 'map__pin';
  buttonMap.style.left = ad.location.x + 'px';
  buttonMap.style.top = (ad.location.y - (pinSize + 18) / 2) + 'px';
  imgAvatar.src = ad.author.avatar;
  imgAvatar.style.width = '40px';
  imgAvatar.style.height = '40px';
  imgAvatar.draggable = 'false';
  buttonMap.appendChild(imgAvatar);
  return buttonMap;
};

var fillMap = function() {
  var blockPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(drawButton(ads[i]));
  }
  blockPins.appendChild(fragment);
};

var renderPopup = function(object) {
  var mapBlock = document.querySelector('.map');
  var similarAdsTemplate = document.querySelector('template').content;
  var adElement = similarAdsTemplate.cloneNode(true);
  var popupFeatures = adElement.querySelector('.popup__features');
  var paragraphs = adElement.querySelectorAll('.map__card p');
  var typeofDwelling = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  adElement.querySelector('h3').textContent = object.offer.title;
  paragraphs[0].textContent = object.offer.address;
  adElement.querySelector('.popup__price').innerHTML = object.offer.price + '&#x20bd;/ночь';
  adElement.querySelector('h4').textContent = typeofDwelling[object.offer.type];
  paragraphs[2].textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
  paragraphs[3].textContent = 'Заезд после' + object.offer.checkin + ',' + ' выезд до ' + object.offer.checkout;
  paragraphs[4].textContent = object.offer.description;
  adElement.querySelector('.popup__avatar').src = object.author.avatar;
  createFeaturesElement(object.offer.features, popupFeatures);
  mapBlock.appendChild(adElement);
};

var createFeaturesElement = function(facility, popupFeatures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    fragment.querySelector('ul').removeChild('li');
    var list = document.createElement('li');
    list.className = 'feature feature--' + features[i];
    fragment.appendChild(list);
  }
  popupFeatures.appendChild(fragment);
};

fillMap();
renderPopup(ads[0]);
drawButton(ads[0]);
