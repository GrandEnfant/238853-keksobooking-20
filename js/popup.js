'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var place = document.querySelector('.map');
  var successMessage = document.querySelector('#success');
  var errorPlace = document.querySelector('#error');

  var close = function (popup, fromRemove) {
    var popupCard = document.querySelector(popup);
    if (popupCard) {
      var renderedPins = document.querySelectorAll('.rendered-pin');
      renderedPins.forEach(function (item) {
        item.classList.remove('map__pin--active');
      });
      fromRemove.removeChild(popupCard);
      document.removeEventListener('click', close);
    }
  };
  var open = function (dataCard) {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      close('.popup', filtersContainer);
    }
    filtersContainer.appendChild(dataCard);
    var closeBtn = document.querySelector('.popup__close');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        close('.popup', filtersContainer);
      }
    });
    closeBtn.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        close('.popup', filtersContainer);
      }
    });
  };

  var openSuccessMessage = function () {
    var clonedSuccess = successMessage.content.cloneNode(true);
    place.appendChild(clonedSuccess);
  };

  var openErrorMessage = function () {
    var clonedError = errorPlace.content.cloneNode(true);
    place.appendChild(clonedError);
    var closeBtn = document.querySelector('.error__button');
    closeBtn.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        close('.error', place);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        close('.error', place);
      }
    });
  };

  window.popup = {
    close: close,
    showCard: open,
    openSuccessMessage: openSuccessMessage,
    openErrorMessage: openErrorMessage,
  };

})();
