'use strict';

var ADS_NUMBER = 5;
var url = 'https://javascript.pages.academy/keksobooking/data';
var housingType = document.querySelector('#housing-type');
var pinSelector = document.querySelector('.map__pin--main');
window.form.setDisableForm(true, 'fieldset', 'ad-form--disabled', '.ad-form');

var applyActiveMode = function () {
  window.form.setDisableForm(false, 'fieldset', 'ad-form--disabled', '.ad-form');
  window.form.fillAddress('#address', '.map__pin--main');
  window.load.loadData(function (ads) {
    var adsSlice = ads.slice(0, ADS_NUMBER);
    window.map.renderAds('.rendered-pin', '.map__pins', '.map', adsSlice, window.pin.getPin, '.map__pin');
    housingType.addEventListener('change', function () {
      var filteredAds = window.filters.dataFilter(ads, '#housing-type').slice(0, ADS_NUMBER);
      window.map.upDateMap(
          '.rendered-pin',
          '.map__pins',
          '.map',
          filteredAds,
          window.pin.getPin,
          '.map__pin');
    });
  },
  function () {
    var errorPlace = document.querySelector('#error');
    var clonedError = errorPlace.content.cloneNode(true);
    pinSelector.appendChild(clonedError);
  }, url);
};

pinSelector.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    applyActiveMode();
  }
});

pinSelector.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    applyActiveMode();
  }
});
