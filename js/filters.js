'use strict';

(function () {
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;
  var ANY_FILTER = 'any';
  var housingTypeNode = document.querySelector('#housing-type');
  var housingPriceNode = document.querySelector('#housing-price');
  var housingRoomsNode = document.querySelector('#housing-rooms');
  var housingGuestsNode = document.querySelector('#housing-guests');
  var filterNode = document.querySelector('.map__filters');

  var selectData = function (it, filterValue) {
    return it.offer.type === filterValue || filterValue === ANY_FILTER;
  };
  var drop = function () {
    filterNode.reset();
  };

  var filterByPrice = function (it, filterValue) {
    var priceInterval = {
      'low': it.offer.price < LOW_PRICE,
      'middle': it.offer.price >= LOW_PRICE && it.offer.price < MIDDLE_PRICE,
      'high': it.offer.price > MIDDLE_PRICE,
      'any': it.offer.price === ANY_FILTER,
    };
    return priceInterval[filterValue] || filterValue === ANY_FILTER;
  };
  var filterByRooms = function (it, filterValue) {
    return it.offer.rooms <= parseInt(filterValue, 10) || filterValue === ANY_FILTER;
  };
  var filterByGuests = function (it, filterValue) {
    return it.offer.guests === parseInt(filterValue, 10) || filterValue === ANY_FILTER;
  };

  var filterByFeatures = function (it, checkedFeatures) {
    for (var i = 0; i < checkedFeatures.length; i++) {
      if (it.offer.features.indexOf(checkedFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var filterAds = function (ads) {
    var checkedFeatures = Array.from(filterNode.querySelectorAll('input[name="features"]:checked'));
    return ads.filter(function (it) {
      return selectData(it, housingTypeNode.value) &&
        filterByPrice(it, housingPriceNode.value) &&
        filterByRooms(it, housingRoomsNode.value) &&
        filterByGuests(it, housingGuestsNode.value) &&
        filterByFeatures(it, checkedFeatures);
    });
  };

  window.filters = {
    selectData: selectData,
    drop: drop,
    filterAds: filterAds,
  };
})();
