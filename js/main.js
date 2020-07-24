'use strict';

(function () {
  var ADS_NUMBER = 5;
  var url = 'https://javascript.pages.academy/keksobooking/data';
  var pinNode = document.querySelector('.map__pin--main');
  var formsNode = document.querySelector('.ad-form');
  var filtersContainerNode = document.querySelector('.map__filters-container');
  var filtersNode = document.querySelector('.map__filters');
  var filterSelectorsNode = filtersNode.querySelectorAll('select');
  var inputSelectorsNode = filtersNode.querySelectorAll('input');
  var resetBtnNode = document.querySelector('.ad-form__reset');
  var place = document.querySelector('.map');
  var pinCoordinateInit = {
    x: pinNode.style.left,
    y: pinNode.style.top,
  };
  var DEBOUNCE_INTERVAL = 500;
  var pinCoordinateString = window.map.getCoordinate(pinCoordinateInit);

  window.form.setDisable(true);
  window.form.fillAddress(pinCoordinateString);

  var disactivePage = function () {
    window.form.setDisable(true);
    window.filters.drop();
    window.popup.close('.popup', filtersContainerNode);
    var renderedPinsNode = document.querySelectorAll('.rendered-pin');
    for (var i = 0; i < renderedPinsNode.length; i++) {
      window.map.removePins('.rendered-pin');
    }
    pinNode.style.left = pinCoordinateInit.x;
    pinNode.style.top = pinCoordinateInit.y;
    window.map.disactive();
    var pinCoordinate = window.map.getCoordinate(pinCoordinateInit);
    window.form.fillAddress(pinCoordinate);
    formsNode.reset();
  };

  var fixCoordinates = function (evt) {
    evt.preventDefault();
    window.popup.close('.popup', filtersContainerNode);
    var newCoordinate = window.map.movePin(evt);
    pinCoordinateString = window.map.getCoordinate(newCoordinate);
    window.form.fillAddress(pinCoordinateString);
    pinNode.removeEventListener('mousedown', fixCoordinates);
  };

  var openPinCard = function (evt, ads, item) {
    var id = evt.currentTarget.id;
    var dataCard = window.card.generate(ads[id]);
    window.popup.showCard(dataCard);
    item.classList.add('map__pin--active');
  };

  var addEventOnPins = function (ads) {
    var renderedPins = document.querySelectorAll('.rendered-pin');
    renderedPins.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        if (evt.button === 0) {
          openPinCard(evt, ads, item);
        }
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.code === 'Enter') {
          openPinCard(evt, ads, item);
        }
      });
    });
  };

  var debounce = function (f) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        f.apply(null, arguments);
      }, DEBOUNCE_INTERVAL);
    };
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
      var debouncedFilterAndRenderAds = debounce(filterAndRenderAds);
      var addEventOnFilters = function (elem) {
        elem.addEventListener('change', function () {
          window.popup.close('.popup', filtersContainerNode);
          debouncedFilterAndRenderAds();
        });
      };
      inputSelectorsNode.forEach(function (elem) {
        addEventOnFilters(elem);
      });
      filterSelectorsNode.forEach(function (elem) {
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

  var dropPage = function (evt) {
    evt.preventDefault();
    window.popup.close('.success', place);
    disactivePage();
    document.removeEventListener('click', onCloseListener);
    document.removeEventListener('keydown', onCloseListener);
  };

  var onCloseListener = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      dropPage(evt);
    }
  };

  var onSubmit = function () {
    var isValidate = window.form.validate();
    if (isValidate) {
      window.serverWorker.sendData(
          new FormData(formsNode),
          function () {
            window.popup.openSuccessMessage();
            document.addEventListener('keydown', onCloseListener);
            document.addEventListener('click', onCloseListener);
          },
          window.popup.openErrorMessage);
    } else {
      window.form.pointEmptyFields();
    }
  };

  pinNode.addEventListener('mousedown', fixCoordinates);
  formsNode.addEventListener('submit', function (evt) {
    evt.preventDefault();
    onSubmit();
  });

  resetBtnNode.addEventListener('click', function () {
    disactivePage();
  });
})();
