'use strict';
(function () {
  var getPin = function (data) {
    var pinButton = document.querySelector('.map__pin'); //нашли куда поставить пины объявлений
    var clonedElement = pinButton.cloneNode(true);
    clonedElement.style.left = data.location.x + clonedElement.querySelector('img').width + 'px';
    clonedElement.style.top = data.location.y + clonedElement.querySelector('img').height + 'px';
    clonedElement.querySelector('img').src = data.author.avatar;
    clonedElement.querySelector('img').alt = data.offer.title;
    return clonedElement;
  };
  var arrayData = generateObjects();
  window.renderAds = function () {
    var mapPin = document.querySelector('.map__pins');
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < arrayData.length; i++) {
      var pin = getPin(arrayData[i]);
      fragmentPins.appendChild(pin);
    }
    mapPin.appendChild(fragmentPins);
  };
})();
