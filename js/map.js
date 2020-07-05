'use strict';

(function () {

  var renderAds = function (removePin, mapPin, mapPlace, data, getPin, selector) {
    var pinButton = document.querySelector(selector);
    var pinSelector = document.querySelector(mapPin);
    var mapSelector = document.querySelector(mapPlace);
    var removePinsSelector = document.querySelectorAll(removePin);
    removePins(removePinsSelector, pinSelector);
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pin = getPin(pinButton, data[i]);
      fragmentPins.appendChild(pin);
    }
    mapSelector.classList.remove('map--faded');
    pinSelector.appendChild(fragmentPins);
  };
  var removePins = function (removePinsSelector, mapPin) {
    removePinsSelector.forEach(function (elem) {
      mapPin.removeChild(elem);
    });
  };
  var upDateMap = function (removePin, mapPin, mapPlace, ads, getPin, selector) {
    renderAds(removePin, mapPin, mapPlace, ads, getPin, selector);
  };
  window.map = {
    renderAds: renderAds,
    upDateMap: upDateMap,
  };
})();
