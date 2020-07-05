'use strict';

(function () {
  var dataFilter = function (ads, housingType) {
    var housingTypeSelector = document.querySelector(housingType);
    var sameHousingType = ads.filter(function (it) {
      return it.offer.type === housingTypeSelector.value || housingTypeSelector.value === 'any';
    });
    return sameHousingType;
  };
  window.filters = {
    dataFilter: dataFilter,
  };
})();
