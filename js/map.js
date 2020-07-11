'use strict';

(function () {
  var pinButton = document.querySelector('.map__pin');
  var mapPinsNode = document.querySelector('.map__pins');
  var mapNode = document.querySelector('.map');
  var pinSize = 65;
  var arrowHeight = 22;

  var createAds = function (data, getPin) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pin = getPin(pinButton, data[i], i);
      fragmentPins.appendChild(pin);
    }
    return fragmentPins;
  };
  var renderAds = function (fragmentPins) {
    mapPinsNode.appendChild(fragmentPins);
    mapNode.classList.remove('map--faded');
  };
  var removePins = function (deletedPins) {
    var removePinsNode = document.querySelectorAll(deletedPins);
    removePinsNode.forEach(function (elem) {
      mapPinsNode.removeChild(elem);
    });
  };

  var movePin = function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: pinButton.offsetLeft - shift.x,
        y: pinButton.offsetTop - shift.y
      };


      if (pinPosition.x >= pinSize - pinSize &&
        pinPosition.x <= mapNode.clientWidth - pinSize &&
        pinPosition.y >= mapNode.clientLeft &&
        pinPosition.y <= mapNode.clientHeight - pinSize) {

        pinButton.style.left = pinPosition.x + 'px';
        pinButton.style.top = pinPosition.y + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    var coordinate = {
      x: pinButton.style.left,
      y: pinButton.style.top,
    };
    return coordinate;
  };
  var getCoordinate = function (coodinate) {
    return parseInt(coodinate.x, 10) + ', ' + (parseInt(coodinate.y, 10) + pinSize + arrowHeight);
  };

  window.map = {
    movePin: movePin,
    getCoordinate: getCoordinate,
    renderAds: renderAds,
    createAds: createAds,
    removePins: removePins,
  };
})();
