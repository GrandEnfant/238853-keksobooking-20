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
var housingType = document.querySelector('#housing-type');
var url = 'https://javascript.pages.academy/keksobooking/data';
var ADS_NUMBER = 5;

window.form.setDisableForm(true, fieldsets);
var applyActiveMode = function () {
  window.form.setDisableForm(false, fieldsets, 'ad-form--disabled', adForm);
  window.form.fillAddress(addressField, mapPinMain);
  window.load.loadData(function (ads) {
    var adsSlice = ads.slice(0, ADS_NUMBER);
    window.map.renderAds(mapSelectors, adsSlice, window.pin.getPin, pinButton);
      housingType.addEventListener('change', function () {
        setTimeout(function () {
          window.map.upDateMap(mapSelectors, adsSlice, window.pin.getPin, pinButton);
        }, 300)
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
  }});
