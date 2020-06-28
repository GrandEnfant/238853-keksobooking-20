'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var mapPlace = document.querySelector('.map');
var adFormMapFilters = document.querySelectorAll('.map__filter');
var mapWidth = mapPlace.offsetWidth;

var applyActiveMode = function () {
  window.form.setDisableForm(false);
  window.form.fillAddress(mapPinMain);
  var data = window.data.generateObjects(mapWidth);
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var pin = window.pin.getPin(data[i]);
    fragmentPins.appendChild(pin);
  }
  window.map.renderAds(fragmentPins);
  mapPlace.classList.remove('map--faded');
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
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
  window.main = {
    mapPinMain: mapPinMain,
    // map: map,
    adFormMapFilters: adFormMapFilters,
  };
});
