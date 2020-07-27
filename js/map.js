'use strict';

(function () {
  var PIN_SIZE = 66;
  var ARROW_HEIGHT = 16;
  var MAIN_PIN_MIN_Y = 130;
  var MAIN_PIN_MAX_Y = 630;
  var pinButtonNode = document.querySelector('.map__pin');
  var mapPinsNode = document.querySelector('.map__pins');
  var mapNode = document.querySelector('.map');
  var filtersNode = document.querySelector('.map__filters');

  var disactive = function () {
    mapNode.classList.add('map--faded');
    filtersNode.disabled = true;
  };

  var createAds = function (data, getPin) {
    var fragmentPins = document.createDocumentFragment();
    data.forEach(function (elem, i) {
      if ('offer' in elem) {
        var pin = getPin(pinButtonNode, elem, i);
        fragmentPins.appendChild(pin);
      }
    });
    return fragmentPins;
  };
  var renderAds = function (fragmentPins) {
    mapNode.classList.remove('map--faded');
    mapPinsNode.appendChild(fragmentPins);

  };
  var removePins = function (deletedPins) {
    var removePinsNode = document.querySelectorAll(deletedPins);
    removePinsNode.forEach(function (elem) {
      mapPinsNode.removeChild(elem);
    });
  };

  var initialCoordinate = {
    x: pinButtonNode.style.left,
    y: pinButtonNode.style.top,
  };
  var setPinOnInitial = function () {
    pinButtonNode.style.left = initialCoordinate.x;
    pinButtonNode.style.top = initialCoordinate.y;
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
        x: pinButtonNode.offsetLeft - shift.x,
        y: pinButtonNode.offsetTop - shift.y
      };

      if (pinPosition.x >= -PIN_SIZE / 2 &&
        pinPosition.x <= mapNode.clientWidth - PIN_SIZE / 2 &&
        pinPosition.y >= MAIN_PIN_MIN_Y &&
        pinPosition.y <= MAIN_PIN_MAX_Y) {

        pinButtonNode.style.left = pinPosition.x + 'px';
        pinButtonNode.style.top = pinPosition.y + 'px';

        var coordinateMove = {
          x: parseInt(pinButtonNode.style.left, 10) + PIN_SIZE / 2,
          y: parseInt(pinButtonNode.style.top, 10) - PIN_SIZE - ARROW_HEIGHT,
        };

        window.form.fillAddress(getCoordinate(coordinateMove));
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
      x: parseInt(pinButtonNode.style.left, 10) + PIN_SIZE / 2,
      y: parseInt(pinButtonNode.style.top, 10) - PIN_SIZE - ARROW_HEIGHT,
    };
    return coordinate;
  };
  var getCoordinate = function (coodinate) {
    return parseInt(coodinate.x, 10) + ', ' + (parseInt(coodinate.y, 10) + PIN_SIZE + ARROW_HEIGHT);
  };

  window.map = {
    movePin: movePin,
    getCoordinate: getCoordinate,
    renderAds: renderAds,
    createAds: createAds,
    removePins: removePins,
    setPinOnInitial: setPinOnInitial,
    disactive: disactive,
  };
})();
