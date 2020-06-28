'use strict';

(function () {
  var renderAds = function (fragmentPins) {
    var mapPin = document.querySelector('.map__pins');
    mapPin.appendChild(fragmentPins);
  };
  window.map = {
    renderAds: renderAds,
  };
})();
