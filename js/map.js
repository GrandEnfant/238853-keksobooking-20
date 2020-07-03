'use strict';

(function () {
  var renderAds = function (mapSelectors, data, getPin, pinButton) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pin = getPin(pinButton, data[i]);
      fragmentPins.appendChild(pin);
    }
    mapSelectors.mapPlace.classList.remove('map--faded');
    mapSelectors.mapPin.appendChild(fragmentPins);
  };
  var removePins = function () {
    var pins = document.querySelectorAll('.rendered-pin');
    pins.forEach(function(elem) {
      mapSelectors.mapPin.removeChild(elem);
    })

  };
  var upDateMap = function (mapSelectors, ads, getPin, pinButton) {
    removePins();
    var sameHousingType = ads.filter(function(it) {
      return it.offer.type === housingType.value || housingType.value === 'any';
    });
    renderAds(mapSelectors, sameHousingType, getPin, pinButton);
  };
  window.map = {
    renderAds: renderAds,
    upDateMap: upDateMap,
  };
})();
