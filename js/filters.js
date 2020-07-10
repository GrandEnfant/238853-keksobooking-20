'use strict';

(function () {
  var dataFilter = function (ads, housingType) {
    var sameHousingType = ads.filter(function (it) {
      return it.offer.type === housingType || housingType === 'any';
    });
    return sameHousingType;
  };

  window.filters = {
    dataFilter: dataFilter,
  };
})();
