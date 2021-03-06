'use strict';
(function () {
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];
  var MIN_PRICE_TYPES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var address = document.querySelector('#address');
  var titleForm = document.querySelector('#title');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var buttonSubmit = document.querySelector('.form__submit');
  var notice = document.querySelector('.notice');
  var form = notice.querySelector('.notice__form');

  var setMinPrice = function (value) {
    price.min = MIN_PRICE_TYPES[value];
  };

  var setRooms = function () {
    var roomNumberValue = roomNumber.value;
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].hidden = false;
    }
    if (roomNumberValue === '1') {
      capacity.value = '1';
      capacity.options[0].hidden = true;
      capacity.options[1].hidden = true;
      capacity.options[3].hidden = true;
    } else if (roomNumberValue === '2') {
      capacity.options[0].hidden = true;
      capacity.options[3].hidden = true;
    } else if (roomNumberValue === '3') {
      capacity.options[3].hidden = true;
    } else if (roomNumberValue === '100') {
      capacity.options[0].hidden = true;
      capacity.options[1].hidden = true;
      capacity.options[2].hidden = true;
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

  var setCoords = function () {
    address.value = window.map.getCoordsPinMain();
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

  var onRoomChange = function () {
    setRooms();
  };
  // работы с сервером
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
      setRooms(roomNumber.value);
      window.card.close();
      setCoords();
    }, window.backend.onError);
  };

  setMinPrice(type.value);
  setRooms(roomNumber.value);
  roomNumber.addEventListener('change', onRoomChange);
  buttonSubmit.addEventListener('click', onButtonError);
  form.addEventListener('submit', onFormSubmit);
  window.synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, syncValues);
  window.synchronizeFields(type, price, TYPES, MIN_PRICES, syncMinPrice);
  window.synchronizeFields(timeIn, timeOut, TIMES, TIMES, syncValues);
  window.synchronizeFields(timeOut, timeIn, TIMES, TIMES, syncValues);

  window.form = {
    main: form,
    setAddress: setAddress
  };

})();
