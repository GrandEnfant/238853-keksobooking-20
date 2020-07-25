'use strict';

(function () {
  var LOW_PRICE = 10000;
  var MIDDLE_PRICE = 50000;
  var housingTypeNode = document.querySelector('#housing-type');
  var housingPriceNode = document.querySelector('#housing-price');
  var housingRoomsNode = document.querySelector('#housing-rooms');
  var housingGuestsNode = document.querySelector('#housing-guests');
  var filterNode = document.querySelector('.map__filters');
  var selectData = function (ads, filterValue) {
    return ads.filter(function (it) {
      return it.offer.type === filterValue || filterValue === 'any';
    });
  };

  var filterByPrice = function (ads, filterValue) {
    return ads.filter(function (it) {
      var priceInterval = {
        'low': it.offer.price < LOW_PRICE,
        'middle': it.offer.price >= LOW_PRICE && it.offer.price < MIDDLE_PRICE,
        'high': it.offer.price > MIDDLE_PRICE,
        'any': it.offer.price === 'any',
      };
      return priceInterval[filterValue] || filterValue === 'any';
    });
  };
  var filterByRooms = function (ads, filterValue) {
    return ads.filter(function (it) {
      return it.offer.rooms <= parseInt(filterValue, 10) || filterValue === 'any';
    });
  };
  var filterByGuests = function (ads, filterValue) {
    return ads.filter(function (it) {
      return it.offer.guests === parseInt(filterValue, 10) || filterValue === 'any';
    });
  };

  var filterByFeatures = function (ads, featureValue) {
    return ads.filter(function (ad) {
      return ad.offer.features.indexOf(featureValue) >= 0;
    });
  };
  var drop = function () {
    filterNode.reset();
  };

  var filterAds = function (ads) {
    ads = selectData(ads, housingTypeNode.value);
    ads = filterByPrice(ads, housingPriceNode.value);
    ads = filterByRooms(ads, housingRoomsNode.value);
    ads = filterByGuests(ads, housingGuestsNode.value);
    var checkedFeatures = Array.from(filterNode.querySelectorAll('input[name="features"]:checked'));
    checkedFeatures.forEach(function (feature) {
      ads = filterByFeatures(ads, feature.value);
    });
    return ads;
  };

  window.filters = {
    selectData: selectData,
    drop: drop,
    filterAds: filterAds,
  };
})();
