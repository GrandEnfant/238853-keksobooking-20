'use strict';

window.main = {
  mapPinMain: document.querySelector('.map__pin--main'),
  map: document.querySelector('.map'),
  adFormMapFilters: document.querySelectorAll('.map__filter'),
};

var applyActiveMode = function () {
  window.form.setDisableForm(false);
  var data = window.data.generateObjects();
  window.map.renderAds(data);
  window.main.map.classList.remove('map--faded');
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
};
window.main.mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    applyActiveMode();
  }
});

window.main.mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    applyActiveMode();
  }
});
