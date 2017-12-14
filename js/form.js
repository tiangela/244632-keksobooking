'use strict';
(function () {
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeElement = document.querySelector('#type');
  var address = document.querySelector('#address');
  var titleForm = document.querySelector('#title');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var buttonSubmit = document.querySelector('.form__submit');
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.notice__form');
  var minPriceTypes = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var setMinPrice = function (value) {
    price.min = minPriceTypes[value];
  };
  setMinPrice(typeElement.value);

  var setRooms = function () {
    var roomChoice = roomNumber.value;
    if (roomChoice === '1') {
      capacity.value = '1';
    } else if (roomChoice === '2') {
      capacity.value = '2';
    } else if (roomChoice === '3') {
      capacity.value = '3';
    } else if (roomChoice === '100') {
      capacity.value = '0';
    }
  };

  var onButtonError = function () {
    if (titleForm.validity.valueMissing) {
      titleForm.style.border = '2px solid red';
    } else if (titleForm.validity.tooShort || titleForm.validity.tooLong) {
      titleForm.style.border = '2px solid red';
    } else {
      titleForm.setCustomValidity('');
      titleForm.style.border = '1px solid #d9d9d3';
    }
    if (price.validity.valueMissing) {
      price.style.border = '2px solid red';
    } else if (price.validity.rangeUnderflow) {
      price.style.border = '2px solid red';
    } else {
      price.style.border = '1px solid #d9d9d3';
    }
  };

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncMinPrice = function (element, value) {
    element.min = value;
  };

  var setAddress = function (value) {
    address.value = value;
  };
  // работы с сервером
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.backend.onError);
  });

  setRooms(roomNumber.value);
  buttonSubmit.addEventListener('click', onButtonError);
  window.synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, syncValues);
  window.synchronizeFields(typeElement, price, TYPES, MIN_PRICES, syncMinPrice);
  window.synchronizeFields(timeIn, timeOut, TIMES, TIMES, syncValues);
  window.synchronizeFields(timeOut, timeIn, TIMES, TIMES, syncValues);

  window.form = {
    setAddress: setAddress
  };

})();
