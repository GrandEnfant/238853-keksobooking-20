'use strict';

(function () {
  var dataFilter = function (ads, housingType) {
    var sameHousingType = ads.filter(function (it) {
      return it.offer.type === housingType || housingType === 'any';
    });
    return sameHousingType;
  };
  var dropReset = function () {
    filters.reset();
  };
  window.filters = {
    dataFilter: dataFilter,
    dropReset: dropReset,
  };
})();
