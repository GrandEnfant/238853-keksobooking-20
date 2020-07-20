'use strict';

(function () {
  var filterNode = document.querySelector('.map__filters');
  var selectData = function (ads, housingType) {
    var sameHousingType = ads.filter(function (it) {
      return it.offer.type === housingType || housingType === 'any';
    });
    return sameHousingType;
  };
  var dropReset = function () {
    filterNode.reset();
  };
  window.filters = {
    selectData: selectData,
    dropReset: dropReset,
  };
})();
