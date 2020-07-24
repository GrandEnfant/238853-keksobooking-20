'use strict';

(function () {
  var pinButton = document.querySelector('.map__pin');
  var mapPinsNode = document.querySelector('.map__pins');
  var mapNode = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var pinSize = 65;
  var arrowHeight = 22;

  var disactive = function () {
    mapNode.classList.add('map--faded');
    filters.disabled = true;
  };

  var createAds = function (data, getPin) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      if ('offer' in data[i]) {
        var pin = getPin(pinButton, data[i], i);
        fragmentPins.appendChild(pin);
      }
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

  var initialCoordinate = {
    x: pinButton.style.left,
    y: pinButton.style.top,
  };
  var setPinOnInitial = function () {
    pinButton.style.left = initialCoordinate.x;
    pinButton.style.top = initialCoordinate.y;
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

      if (pinPosition.x >= -pinSize / 2 &&
        pinPosition.x <= mapNode.clientWidth - pinSize / 2 &&
        pinPosition.y >= -(pinSize / 2 + 18) &&
        pinPosition.y <= mapNode.clientHeight - (pinSize + 18)) {

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
    setPinOnInitial: setPinOnInitial,
    disactive: disactive,
    // dropHighlight: dropHighlight,
  };
})();
