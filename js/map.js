'use strict';

(function () {

  var ADS_NUMBER = 5;
  var renderAds = function (mapSelectors, data, getPin, pinButton) {
    var adsSlice = data.slice(0, ADS_NUMBER);
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < adsSlice.length; i++) {
      var pin = getPin(pinButton, adsSlice[i]);
      fragmentPins.appendChild(pin);
    }
    mapSelectors.mapPlace.classList.remove('map--faded');
    mapSelectors.mapPin.appendChild(fragmentPins);
  };
  var removePins = function (mapSelectors) {
    var pins = document.querySelectorAll('.rendered-pin');
    pins.forEach(function (elem) {
      mapSelectors.mapPin.removeChild(elem);
    });
  };
  var upDateMap = function (mapSelectors, ads, getPin, pinButton) {
    removePins(mapSelectors);
    renderAds(mapSelectors, ads, getPin, pinButton);
  };
  window.map = {
    renderAds: renderAds,
    upDateMap: upDateMap,
  };
})();
