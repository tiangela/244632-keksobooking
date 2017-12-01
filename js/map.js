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
var map = document.querySelector('.map');
var activePin = null;
var currentPopup = null;
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

var fillMap = function () {
  var blockPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < ads.length; j++) {
    fragment.appendChild(drawButton(ads[j]));
  }
  blockPins.appendChild(fragment);
};

var createFeaturesElement = function (facility, popupFeatures) {
  var fragment = document.createDocumentFragment();
  popupFeatures.innerHTML = '';
  for (var k = 0; k < facility.length; k++) {
    var list = document.createElement('li');
    list.className = 'feature feature--' + facility[k];
    fragment.appendChild(list);
  }
  popupFeatures.appendChild(fragment);
};

var renderPopup = function (object) {
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
  return adElement.querySelector('.map__card');
};

var showPopup = function (view) {
  var popup = renderPopup(view);
  if (currentPopup) {
    map.removeChild(currentPopup);
  }
  currentPopup = popup;
  map.appendChild(popup);
  var popupClose = currentPopup.querySelector('.popup__close');
  popupClose.addEventListener ('click', onCloseClick);
};

var pinMain = map.querySelector('.map__pin--main');
var notice = document.querySelector('.notice');
var fieldset = document.querySelector('fieldset');

var onPinMouseup = function () {
  map.classList.remove('map--faded');
  notice.classList.remove('notice__form--disabled');
  fieldset.classList.remove('disabled');
  fillMap();
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var l = 0; l < pins.length; l++) {
    pins[l].addEventListener('click', onPinClick);
  }
  pinMain.removeEventListener('mouseup', onPinMouseup);
};

var onPinClick = function (evn) {
  var target = evn.currentTarget; // элемент, на котором повесили событие.
  var idPin = target.dataset.id;
  if (activePin) { // проверяем null или нет
    activePin.classList.remove('map__pin--active');
  }
  activePin = target;
  activePin.classList.add('map__pin--active');
  showPopup(ads[idPin]);
};

var onCloseClick = function () {
  map.removeChild(currentPopup);
  currentPopup = null;
};

pinMain.addEventListener('mouseup', onPinMouseup);
