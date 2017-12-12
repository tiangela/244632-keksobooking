'use strict';
(function () {
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeElement = document.querySelector('#type');
  var address = document.querySelector('#address');
  var titleForm = document.querySelector('#title');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var buttonSubmit = document.querySelector('.form__submit');
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
/*  var onRoomChange = function (evn) {
    var value = evn.currentTarget.value;
    setRooms(value);
  };*/

  var onButtonError = function () {
    if (titleForm.validity.valueMissing) {
      titleForm.setCustomValidity('Обязательное поле');
      titleForm.style.border = '2px solid red';
    } else {
      titleForm.setCustomValidity('');
      titleForm.style.border = '1px solid #d9d9d3';
    }
    if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
      price.style.border = '2px solid red';
    } else {
      price.setCustomValidity('');
      price.style.border = '1px solid #d9d9d3';
    }
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var setAddress = function (value) {
    address.value = value;
  };

  setRooms(roomNumber.value);
  //roomNumber.addEventListener('change', onRoomChange);
  buttonSubmit.addEventListener('click', onButtonError);
  window.synchronizeFields(roomNumber, capacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);
  window.synchronizeFields(typeElement, price, ['bungalo', 'flat', 'house', 'palace'], ['0', '1000', '5000', '10000'], syncValues);
  window.synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  window.form = {
    setAddress: setAddress
  };

})();
