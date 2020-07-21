'use strict';

var ADS_NUMBER = 5;
var url = 'https://javascript.pages.academy/keksobooking/data';
var pinNode = document.querySelector('.map__pin--main');
var forms = document.querySelector('.ad-form');
var filtersContainer = document.querySelector('.map__filters-container');
var filtersNode = document.querySelector('.map__filters');
var filterSelectors = filtersNode.querySelectorAll('select');
var inputSelectors = filtersNode.querySelectorAll('input');
var pinCoordinateInit = {
  x: pinNode.style.left,
  y: pinNode.style.top,
};
var DEBOUNCE_INTERVAL = 500;
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
var addEventOnPins = function (ads) {
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
};
var debounce = function (cb) {
  var lastTimeout = null;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function () {
    cb();
  }, DEBOUNCE_INTERVAL);
};
var applyActiveMode = function () {
  window.form.setDisable(false);
  window.form.fillAddress(pinCoordinateString);
  window.serverWorker.loadData(function (ads) {
    var adsSlice = ads.slice(0, ADS_NUMBER);
    var initAdsFragment = window.map.createAds(adsSlice, window.pin.generate);
    window.map.renderAds(initAdsFragment);
    addEventOnPins(ads);
    var filterAndRenderAds = function () {
      var filteredAds = window.filters.filterAds(ads).slice(0, ADS_NUMBER);
      var filteredAdsFragment = window.map.createAds(filteredAds, window.pin.generate);
      window.map.removePins('.rendered-pin');
      window.map.renderAds(filteredAdsFragment);
      addEventOnPins(filteredAds);
    };
    var addEventOnFilters = function (elem) {
      elem.addEventListener('change', function () {
        window.popup.close('.popup', filtersContainer);
        debounce(filterAndRenderAds);
      });
    };
    inputSelectors.forEach(function (elem) {
      addEventOnFilters(elem);
    });
    filterSelectors.forEach(function (elem) {
      addEventOnFilters(elem);
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
