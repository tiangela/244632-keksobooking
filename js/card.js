'use strict';

(function () {
  var closeBtn = null;
  var currentPopup = null;
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
  var getCloseBtn = function () {
    return closeBtn;
  };

  var createPopup = function (object) {
    var similarAdsTemplate = document.querySelector('template').content;
    var adElement = similarAdsTemplate.cloneNode(true);
    var popupFeatures = adElement.querySelector('.popup__features');
    var paragraphs = adElement.querySelectorAll('.map__card p');
    var imagesList = adElement.querySelector('.popup__pictures');
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
  // adElement.querySelector('.popup__pictures li img').src = object.offer.photos;
    for (var i = 0; i < object.offer.photos.length; i++) {
      var listTag = document.createElement('li');
      var imageTag = document.createElement('img');
      imageTag.style = 'width: 40px; height: 40px; margin-right: 5px';
      imageTag.setAttribute('src', object.offer.photos[i]);
      listTag.appendChild(imageTag);
      imagesList.appendChild(listTag);
    }
    createFeaturesElement(object.offer.features, popupFeatures);
    return adElement.querySelector('.map__card');
  };

  var showPopup = function (object, container) {
    var popup = createPopup(object);
    if (currentPopup) {
      container.removeChild(currentPopup);
    }
    currentPopup = popup;
    container.appendChild(popup);
    closeBtn = currentPopup.querySelector('.popup__close');
  };

  var closePopup = function (container) {
    container.removeChild(currentPopup);
    currentPopup = null;
  };

  window.card = {
    show: showPopup,
    getCloseBtn: getCloseBtn,
    createFeaturesElement: createFeaturesElement,
    createPopup: createPopup,
    closePopup: closePopup
  };
})();
