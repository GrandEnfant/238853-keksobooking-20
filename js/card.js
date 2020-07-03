'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var card = document.querySelector('#card');
  var fragmentImgs = document.createDocumentFragment();
  /**
   * @description closePopup - Удаляет попап с карточкой объявления.
   * @return {void} undef
   */
  var closePopup = function () {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      filtersContainer.removeChild(popupCard);
    }
    document.removeEventListener('click',  closePopup);
  };
  /**
   * @description getPhotos - Отдает все фото отеля для отображения на карточке объявления как теги img.
   * @param {object} data объект с данными объявления
   * @return {void} undef
   */
  var getPhotos = function (data) {
    window.data = data;
    var photos = data.offer.photos;
    for (var j = 0; j < photos.length; j++) {
      var clonedCard = card.content.cloneNode(true);
      var clonedPhotos = clonedCard.querySelector('.popup__photos');
      var img = clonedPhotos.querySelector('img');
      img.src = photos[j];
      fragmentImgs.appendChild(img);
    }
    return fragmentImgs;
  };
  /**
   * @description generateCard - подставляет данные объявления в свойства, создавая карточку.
   * @param {object} data объект с данными объявления
   * @param {number} adNumber индекс пина для связи его с объектом из массива data.
   * @return {node} готовая карточка с данными
   */
  var generateCard = function (data, adNumber) {
    var clonedCard = card.content.cloneNode(true);

    var avatar = clonedCard.querySelector('.popup__avatar');
    avatar.src = data.author.avatar;

    var title = clonedCard.querySelector('.popup__title');
    title.textContent = data.offer.title;

    var address = clonedCard.querySelector('.popup__text--address');
    address.textContent = data.offer.address;

    var price = clonedCard.querySelector('.popup__text--price');
    price.textContent = data.offer.price + ' ₽/ночь';

    var type = clonedCard.querySelector('.popup__type');
    type.textContent = data.offer.type;

    var roomsNumber = clonedCard.querySelector('.popup__text--capacity');
    roomsNumber.textContent = data.offer.rooms;

    var check = clonedCard.querySelector('.popup__text--time');
    check.textContent = 'Заезд после ' + data.offer.checkin + ', ' + ' выезд до ' + data.offer.checkout;

    var features = clonedCard.querySelector('.popup__features');
    features.textContent = data.offer.features.join(',');

    var description = clonedCard.querySelector('.popup__description');
    description.textContent = data.offer.description;

    var photos = clonedCard.querySelector('.popup__photos');
    var img = photos.querySelector('img');
    var template = getPhotos(data, adNumber);
    photos.replaceChild(template, img);

    var closeBtn = clonedCard.querySelector('.popup__close');
    closeBtn.addEventListener('click', function () {
      closePopup();
    });
    return clonedCard;
  };

  var showCard = function (data, adNumber) {
    var dataCard = generateCard(data, adNumber);
    filtersContainer.appendChild(dataCard);
  };
  /**
   * @description updatePopup - Показывает попап с карточкой объявления.
   * @param  {object} data массив с объектами объявлений.
   * @param  {number} adNumber индекс пина для связи его с объектом из массива data.
   */
  var updatePopup = function (data, adNumber) {
    closePopup();
    showCard(data, adNumber);
  };
  window.showAdPopup = updatePopup;

})();
