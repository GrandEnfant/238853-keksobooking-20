'use strict';

var ADS_NUMBER = 5;
var url = 'https://javascript.pages.academy/keksobooking/data';
var housingType = document.querySelector('#housing-type');
var pinNode = document.querySelector('.map__pin--main');
var forms = document.querySelector('.ad-form');
var pinCoordinateInit = {
  x: pinNode.style.left,
  y: pinNode.style.top,
};
var submitButton = document.querySelector('.ad-form__submit');
var pinCoordinateString = window.map.getCoordinate(pinCoordinateInit);
window.form.setDisable(true);
window.form.fillAddress(pinCoordinateString);
var resetBtn = document.querySelector('.ad-form__reset');
var fixCoordinates = function (evt) {
  evt.preventDefault();
  window.popup.close();
  var newCoordinate = window.map.movePin(evt);
  pinCoordinateString = window.map.getCoordinate(newCoordinate);
  window.form.fillAddress(pinCoordinateString);
  pinNode.removeEventListener('mousedown', fixCoordinates);
};

var applyActiveMode = function () {
  window.form.setDisable(false);
  window.form.fillAddress(pinCoordinateString);
  window.serverWorker.loadData(function (ads) {
    var adsSlice = ads.slice(0, ADS_NUMBER);
    var initAdsFragment = window.map.createAds(adsSlice, window.pin.generate);
    window.map.renderAds(initAdsFragment);
    housingType.addEventListener('change', function () {
      var filteredAds = window.filters.selectData(ads, housingType.value).slice(0, ADS_NUMBER);
      var filteredAdsFragment = window.map.createAds(filteredAds, window.pin.generate);
      window.map.removePins('.rendered-pin');
      window.map.renderAds(filteredAdsFragment);
    });
    var renderedPins = document.querySelectorAll('.rendered-pin');
    renderedPins.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        if (evt.button === 0) {
          var id = evt.currentTarget.id;
          var dataCard = window.card.generate(ads[id]);
          window.popup.showCard(dataCard);
        }
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.code === 'Enter') {
          var id = evt.currentTarget.id;
          var dataCard = window.card.generate(ads[id]);
          window.popup.showCard(dataCard);
        }
      });
    });

    pinNode.addEventListener('mousedown', fixCoordinates);
  },
  function () {
    var errorPlace = document.querySelector('#error');
    var clonedError = errorPlace.content.cloneNode(true);
    pinNode.appendChild(clonedError);
  }, url);
};

pinNode.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    applyActiveMode();
  }
});

pinNode.addEventListener('keydown', function (evt) {
  if (evt.code === 'Enter') {
    applyActiveMode();
  }
});

submitButton.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    var isValidate = window.form.validate();
    if (isValidate) {
      window.serverWorker.sendData(new FormData(forms),
          window.popup.openSuccessMessage,
          window.popup.openErrorMessage);
    } else {
      window.form.pointEmptyFields();
    }
  }
});

resetBtn.addEventListener('click', function () {
  window.filters.dropReset();
});
