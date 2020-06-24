'use strict';

(function () {
  window.fieldset = document.querySelector('fieldset');
  window.adForm = document.querySelector('.ad-form');
  fieldset.disabled = true;
  window.adFormMapFilters = document.querySelectorAll('.map__filter');
  window.addressField.placeholder = parseInt(window.mapPinMain.style.left, 10) + ', ' + parseInt(window.mapPinMain.style.top, 10);
}());
