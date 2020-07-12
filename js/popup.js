'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');

  var closePopup = function () {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      filtersContainer.removeChild(popupCard);
      document.removeEventListener('click', closePopup);
    }
  };
  var openPopup = function (dataCard) {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      closePopup();
    }
    filtersContainer.appendChild(dataCard);
    var closeBtn = document.querySelector('.popup__close');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closePopup();
      }
    });
    closeBtn.addEventListener('click', function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        closePopup();
      }
    });
  };
  window.popup = {
    closePopup: closePopup,
    showCard: openPopup
  };
})();
