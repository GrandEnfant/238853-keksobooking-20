'use strict';

window.mapPinMain = document.querySelector('.map__pin--main');
window.addressField = document.querySelector('#address');
window.map = document.querySelector('.map');

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
