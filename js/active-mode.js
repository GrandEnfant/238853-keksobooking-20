(function () {
  var applyActive = function () {
    window.generateObjects();
    window.renderAds();
    map.classList.remove('map--faded');
    fieldset.disabled = false;
    adForm.classList.remove('ad-form--disabled');
    adFormFieldset.disabled = false;
    for (var l = 0; l < adFormMapFilters.length; l++) {
      adFormMapFilters[l].disabled = false;
    }
  };
  window.applyActive = applyActive;
})();
