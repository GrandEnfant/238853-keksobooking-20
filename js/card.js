'use strict';

(function () {
  var card = document.querySelector('#card');
  var fragmentImgs = document.createDocumentFragment();

  var getPhotos = function (data) {
    var photos = data[0].offer.photos;
    for (var j = 0; j < photos.length; j++) {
      var clonedCard = card.content.cloneNode(true);
      var clonedPhotos = clonedCard.querySelector('.popup__photos');
      var img = clonedPhotos.querySelector('img');
      img.src = photos[j];
      fragmentImgs.appendChild(img);
    }
    return fragmentImgs;
  };

  var getCard = function (data) {
    var clonedCard = card.content.cloneNode(true);

    var title = clonedCard.querySelector('.popup__title');
    title.textContent = data[0].offer.title;

    var address = clonedCard.querySelector('.popup__text--address');
    address.textContent = data[0].offer.address;

    var price = clonedCard.querySelector('.popup__text--price');
    price.textContent = data[0].offer.price + ' ₽/ночь';

    var type = clonedCard.querySelector('.popup__type');
    type.textContent = data[0].offer.type;

    var roomsNumber = clonedCard.querySelector('.popup__text--capacity');
    roomsNumber.textContent = data[0].offer.rooms;

    var check = clonedCard.querySelector('.popup__text--time');
    check.textContent = 'Заезд после ' + data[0].offer.checkin + ', ' + ' выезд до ' + data[0].offer.checkout;

    var features = clonedCard.querySelector('.popup__features');
    features.textContent = data[0].offer.features.join(', ');

    var description = clonedCard.querySelector('.popup__description');
    description.textContent = data[0].offer.description;

    var photos = clonedCard.querySelector('.popup__photos');
    var img = photos.querySelector('img');
    var template = getPhotos(data);
    photos.replaceChild(template, img);
    return clonedCard;
  };
  getCard();
})();
