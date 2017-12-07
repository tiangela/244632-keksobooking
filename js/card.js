'use strict';
(function () {
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

  var createPopup = function (object) {
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

  var showPopup = function (object, container) {
    var popup = createPopup(object);
    if (currentPopup) {
      container.removeChild(currentPopup);
    }
    currentPopup = popup;
    container.appendChild(popup);
//    var popupClose = currentPopup.querySelector('.popup__close');
//    popupClose.addEventListener('click', onCloseClick);
  };
  var closeBtn = document.querySelector('.popup__close');

  var closePopup = function (container) {
    container.removeChild(currentPopup);
    currentPopup = null;
  };

  window.card = {
    closeBtn: closeBtn,
    createFeaturesElement: createFeaturesElement,
    createPopup: createPopup,
    showPopup: showPopup,
    closePopup: closePopup
  };
})();
