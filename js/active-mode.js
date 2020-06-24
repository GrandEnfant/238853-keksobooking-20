'use strict';

(function () {
  window.applyActive = function () {
    window.arrayData = window.generateObjects();
    window.renderAds();
    window.map.classList.remove('map--faded');
    window.fieldset.disabled = false;
    window.adForm.classList.remove('ad-form--disabled');
    for (var l = 0; l < window.adFormMapFilters.length; l++) {
      window.adFormMapFilters[l].disabled = false;
    }
  };
})();
