'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var place = document.querySelector('.map');
  var forms = document.querySelector('.ad-form');
  var closePopup = function (popup, fromRemove) {
    var popupCard = document.querySelector(popup);
    if (popupCard) {
      fromRemove.removeChild(popupCard);
      document.removeEventListener('click', closePopup);
    }
  };
  var openPopup = function (dataCard) {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      closePopup('.popup', filtersContainer);
    }
    filtersContainer.appendChild(dataCard);
    var closeBtn = document.querySelector('.popup__close');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup('.popup', filtersContainer);
      }
    });
    closeBtn.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        closePopup('.popup', filtersContainer);
      }
    });
  };
  var openSuccessPopup = function () {
    var clonedSuccess = document.content.cloneNode(true);
    place.appendChild(clonedSuccess);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup('.success', place);
        forms.reset();
        location.reload();
      }
    });
    document.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        closePopup('.success', place);
      }
    });
  };
  var openErrorPopup = function () {
    var errorPlace = document.querySelector('#error');
    var clonedError = errorPlace.content.cloneNode(true);
    place.appendChild(clonedError);
    var closeBtn = document.querySelector('.error__button');
    closeBtn.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        closePopup('.error', place);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup('.error', place);
      }
    });
  };

  window.popup = {
    closePopup: closePopup,
    showCard: openPopup,
    openSuccessPopup: openSuccessPopup,
    openErrorPopup: openErrorPopup,
  };
})();
