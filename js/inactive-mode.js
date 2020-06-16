(function () {

  var fieldset = document.querySelector('fieldset');
  window.fieldset = fieldset;
  var adForm = document.querySelector('.ad-form');
  window.adForm = adForm;
  fieldset.disabled = true;
  var adFormFieldset = adForm.querySelector('fieldset');
  window.adFormFieldset = adFormFieldset;
  window.adFormFieldset.disabled = true;

  var adFormMapFilters = document.querySelectorAll('.map__filter');
  window.adFormMapFilters = adFormMapFilters;
  for (var i = 0; i < adFormMapFilters.length; i++) {
    adFormMapFilters[i].disabled = true;
  }
  addressField.placeholder = parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10);
}());
