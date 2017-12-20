'use strict';
(function () {
  var FILTER_MIN_PRICE = 10000;
  var FILTER_MAX_PRICE = 50000;
  var MAX_NUMBER_OF_PINS = 5;

  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var housingFeaturesCollection = filters.querySelectorAll('.features input[type="checkbox"]');
  var housingFeaturesArray = Array.prototype.slice.call(housingFeaturesCollection, 0);
  var filteredPins;


  var hideAllPins = function (pins) {
    pins.forEach(function (pin) {
      pin.classList.add('hidden');
    });
  };

  var showFilteredPins = function () {
    var iterationCount = Math.min(MAX_NUMBER_OF_PINS, filteredPins.length);
    for (var i = 0; i < iterationCount; i++) {
      filteredPins[i].classList.remove('hidden');
    }
  };

  var filterByProperty = function (filterSelect, property) {
    return function (item) {
      var id = item.dataset.id;

      if (filterSelect.value === 'any' || filterSelect.value === (window.offers[id].offer[property] + '')) {
        return true;
      } else {
        return false;
      }
    };
  };

  var filterByPrice = function (filterSelect) {
    return function (item) {
      var id = item.dataset.id;
      var adPrice = window.offers[id].offer.price + '';

      switch (filterSelect.value) {
        case 'any':
          return true;
        case 'middle':
          return adPrice >= FILTER_MIN_PRICE && adPrice <= FILTER_MAX_PRICE;
        case 'low':
          return adPrice < FILTER_MIN_PRICE;
        case 'high':
          return adPrice > FILTER_MAX_PRICE;
      }

      return false;
    };
  };

  var filterByFeatures = function (item) {
    var id = item.dataset.id;
    var features = [];

    housingFeaturesArray.forEach(function (_item, i) {
      if (housingFeaturesArray[i].checked) {
        features.push(housingFeaturesArray[i].value);
      }
    });

    return features.every(function (feature) {
      return window.offers[id].offer.features.indexOf(feature) !== -1;
    });
  };

  var updateFilteredPins = function () {
    filteredPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    filteredPins = Array.from(filteredPins);
    // При изменении формы с фильтрами изначально скрываем все пины
    hideAllPins(filteredPins);

    // И скрываем блок с объявлением
    window.card.close();

    // Фильтруем массив с пинами, пин объявления, которое не подходит, не попадает в filteredPins
    filteredPins = filteredPins.filter(filterByProperty(housingType, 'type'));
    filteredPins = filteredPins.filter(filterByPrice(housingPrice));
    filteredPins = filteredPins.filter(filterByProperty(housingRooms, 'rooms'));
    filteredPins = filteredPins.filter(filterByProperty(housingGuests, 'guests'));
    filteredPins = filteredPins.filter(filterByFeatures);

    // После всех фильтраций показываем пины, которые соответствуют фильтрам
    showFilteredPins(filteredPins);
  };

  var onFiltersChange = function () {
    window.debounce(updateFilteredPins);
  };

  filters.addEventListener('change', onFiltersChange);

})();
