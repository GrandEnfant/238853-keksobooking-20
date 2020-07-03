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
var ADS_NUMBER = 5;
var DEBOUNCE_INTERVAL = 3000;

var debounce = function (cb, adsSlice) {
  var lastTimeout;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function () {
    cb(
        mapSelectors,
        adsSlice,
        window.pin.getPin,
        pinButton,
        housingType
    );
  }, DEBOUNCE_INTERVAL);
};
window.form.setDisableForm(true, fieldsets);
var applyActiveMode = function () {
  window.form.setDisableForm(false, fieldsets, 'ad-form--disabled', adForm);
  window.form.fillAddress(addressField, mapPinMain);
  window.load.loadData(function (ads) {
    var adsSlice = ads.slice(0, ADS_NUMBER);
    window.map.renderAds(mapSelectors, adsSlice, window.pin.getPin, pinButton);
    housingType.addEventListener('change', function () {
      debounce(window.map.upDateMap, adsSlice);
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
