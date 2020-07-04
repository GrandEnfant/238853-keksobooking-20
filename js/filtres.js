'use strict';

(function () {
  var dataFilter = function (ads, housingType) {
    var sameHousingType = ads.filter(function (it) {
      return it.offer.type === housingType.value || housingType.value === 'any';
    });
    return sameHousingType;
  };
  window.filteres = {
    dataFilter: dataFilter,
  };
})();
