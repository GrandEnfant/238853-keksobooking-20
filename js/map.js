'use strict';

(function () {
  var pinButton = document.querySelector('.map__pin');
  var mapNode = document.querySelector('.map__pins');
  var pinNode = document.querySelector('.map');
  var mapPinNode = document.querySelector('.map__pins');

  var createAds = function (data, getPin) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pin = getPin(pinButton, data[i], i);
      fragmentPins.appendChild(pin);
    }
    return fragmentPins;
  };
  var renderAds = function (fragmentPins) {
    mapNode.appendChild(fragmentPins);
    pinNode.classList.remove('map--faded');
  };
  var removePins = function (deletedPins) {
    var removePinsNode = document.querySelectorAll(deletedPins);
    removePinsNode.forEach(function (elem) {
      mapPinNode.removeChild(elem);
    });
  };
  window.map = {
    renderAds: renderAds,
    createAds: createAds,
    removePins: removePins,
  };
})();
