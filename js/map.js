'use strict';

(function () {
  var PIN_SIZE = 65;
  var ARROW_HEIGHT = 22;
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
    for (var i = 0; i < data.length; i++) {
      if ('offer' in data[i]) {
        var pin = getPin(pinButtonNode, data[i], i);
        fragmentPins.appendChild(pin);
      }
    }
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
        pinPosition.y >= -(PIN_SIZE / 2 + 18) &&
        pinPosition.y <= mapNode.clientHeight - (PIN_SIZE + 18)) {

        pinButtonNode.style.left = pinPosition.x + 'px';
        pinButtonNode.style.top = pinPosition.y + 'px';

        var coordinate = {
          x: pinButtonNode.style.left,
          y: pinButtonNode.style.top,
        };

        window.form.fillAddress(getCoordinate(coordinate));
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
      x: pinButtonNode.style.left,
      y: pinButtonNode.style.top,
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
