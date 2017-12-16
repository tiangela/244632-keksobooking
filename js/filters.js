'use strict';
var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeatures = document.querySelector('#housing-features');
housingType.addEventListener('change', window.offers.filter(function (it) {
  return it.type === 'house';
}));

/*housingPrice.addEventListener('change', function () {
  housingPrice.filter = window.offer.price;
});*/

housingRooms.addEventListener('change', function () {});
housingGuests.addEventListener('change', function () {});
housingFeatures.addEventListener('change', function () {});
