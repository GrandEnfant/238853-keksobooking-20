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
var mapWidth = mapSelectors.mapPlace.offsetWidth;
window.form.setDisableForm(true, fieldsets);
var applyActiveMode = function () {
  window.form.setDisableForm(false, fieldsets, 'ad-form--disabled', adForm);
  window.form.fillAddress(addressField, mapPinMain);
  var data = window.load.loadData(
    

  );
  window.map.renderAds(mapSelectors, data, window.pin.getPin, pinButton);
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
