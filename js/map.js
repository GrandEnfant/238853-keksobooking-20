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
  window.map = {
    renderAds: renderAds,
  };
})();
