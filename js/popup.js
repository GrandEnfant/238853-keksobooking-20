'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');

  var closePopup = function () {
    var popupCard = document.querySelector('.popup');
    filtersContainer.removeChild(popupCard);
    document.removeEventListener('click', closePopup);
  };

  var showCard = function (dataCard) {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      closePopup();
    }
    filtersContainer.appendChild(dataCard);
    var closeBtn = document.querySelector('.popup__close');
    closeBtn.addEventListener('click', function () {
      closePopup();
    });
  };

  window.popup = {
    closePopup: closePopup,
    showCard: showCard
  };
})();
