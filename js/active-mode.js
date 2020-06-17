'use strict';

(function () {
  var applyActive = function () {
    var arrayData = window.generateObjects();
    window.arrayData = arrayData;
    window.renderAds();
    window.map.classList.remove('map--faded');
    window.fieldset.disabled = false;
    window.adForm.classList.remove('ad-form--disabled');
    window.adFormFieldset.disabled = false;
    for (var l = 0; l < window.adFormMapFilters.length; l++) {
      window.adFormMapFilters[l].disabled = false;
    }
  };
  window.applyActive = applyActive;
})();
