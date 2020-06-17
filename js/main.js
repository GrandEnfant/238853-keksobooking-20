'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
window.mapPinMain = mapPinMain;
var addressField = document.querySelector('#address');
window.addressField = addressField;
var map = document.querySelector('.map');
window.map = map;

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    window.applyActive();
    addressField.placeholder = evt.x + ', ' + evt.y;
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    window.applyActive();
  }
});
