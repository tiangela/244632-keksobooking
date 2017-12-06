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

  var onTimeinChange = function (evn) {
    var timeInChoice = evn.currentTarget;
    timeOut.value = timeInChoice.value;
  };

  var onTimeoutChange = function (evn) {
    var timeOutChoice = evn.currentTarget;
    timeIn.value = timeOutChoice.value;
  };

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

  var onRoomChange = function (evn) {
    var value = evn.currentTarget.value;
    setRooms(value);
  };

  var onButtonError = function () {
    if (address.validity.valueMissing) {
      address.setCustomValidity('Обязательное поле');
      address.style.border = '2px solid red';
    } else {
      address.setCustomValidity('');
      address.style.border = '1px solid #d9d9d3';
    }
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

  var setMinPrice = function (value) {
    price.min = minPriceTypes[value];
  };

  var onTypeChange = function (evt) {
    var value = evt.currentTarget.value;
    setMinPrice(value);
  };

  setRooms(roomNumber.value);
  setMinPrice(typeElement.value);
  roomNumber.addEventListener('change', onRoomChange);
  buttonSubmit.addEventListener('click', onButtonError);
  typeElement.addEventListener('change', onTypeChange);
  timeIn.addEventListener('change', onTimeinChange);
  timeOut.addEventListener('change', onTimeoutChange);
})();
