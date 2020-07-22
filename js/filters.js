'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var featureValue = document.querySelector('#housing-features');
  var filterNode = document.querySelector('.map__filters');
  var selectData = function (ads, filterValue) {
    return ads.filter(function (it) {
      return it.offer.type === filterValue || filterValue === 'any';
    });
  };
  var filterByPrice = function (ads, filterValue) {
    return ads.filter(function (it) {
      var priceInterval = {
        'low': it.offer.price < 10000,
        'middle': it.offer.price >= 10000 && it.offer.price < 50000,
        'high': it.offer.price > 50000,
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
  var filterByFeatures = function (ads, filterValue) {
    return ads.filter(function (it) {
      return it.offer.features.indexOf(filterValue);
    });
  };
  var drop = function () {
    filterNode.reset();
  };

  var filterAds = function (ads) {
    ads = selectData(ads, housingType.value);
    ads = filterByPrice(ads, housingPrice.value);
    ads = filterByRooms(ads, housingRooms.value);
    ads = filterByGuests(ads, housingGuests.value);
    ads = filterByFeatures(ads, featureValue.value);
    return ads;
  };

  window.filters = {
    selectData: selectData,
    drop: drop,
    filterAds: filterAds,
  };
})();
