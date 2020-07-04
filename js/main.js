'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
var addressField = document.querySelector('#address');
var pinButton = document.querySelector('.map__pin');
var mapSelectors = {
  mapPin: document.querySelector('.map__pins'),
  mapPlace: document.querySelector('.map'),
};
var url = 'https://javascript.pages.academy/keksobooking/data';
var housingType = document.querySelector('#housing-type');

window.form.setDisableForm(true, fieldsets);
var applyActiveMode = function () {
  window.form.setDisableForm(false, fieldsets, 'ad-form--disabled', adForm);
  window.form.fillAddress(addressField, mapPinMain);
  window.load.loadData(function (ads) {
    window.map.renderAds(mapSelectors, ads, window.pin.getPin, pinButton);
    housingType.addEventListener('change', function () {
      var filteredAds = window.filteres.dataFilter(ads, housingType);
      window.map.upDateMap(mapSelectors,
          filteredAds,
          window.pin.getPin,
          pinButton);
    });
  },
  function () {
    var errorPlace = document.querySelector('#error');
    var clonedError = errorPlace.content.cloneNode(true);
    mapSelectors.mapPin.appendChild(clonedError);
  }, url);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    applyActiveMode();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    applyActiveMode();
  }
});
