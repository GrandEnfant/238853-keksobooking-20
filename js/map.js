'use strict';

(function () {
  window.map = {
    renderAds: function (data) {
      var mapPin = document.querySelector('.map__pins');
      var fragmentPins = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        var pin = window.pin.getPin(data[i]);
        fragmentPins.appendChild(pin);
      }
      mapPin.appendChild(fragmentPins);
      window.main.map.classList.remove('map--faded');
    }
  };
})();
