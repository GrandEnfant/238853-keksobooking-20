'use strict';

(function () {

  var card = document.querySelector('#card');

  var getPhotos = function (data) {
    var fragmentImgs = document.createDocumentFragment();
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
  var generate = function (data) {
    var clonedCard = card.content.cloneNode(true);
    var avatar = clonedCard.querySelector('.popup__avatar');
    var title = clonedCard.querySelector('.popup__title');
    var address = clonedCard.querySelector('.popup__text--address');
    var price = clonedCard.querySelector('.popup__text--price');
    var type = clonedCard.querySelector('.popup__type');
    var roomsNumber = clonedCard.querySelector('.popup__text--capacity');
    var check = clonedCard.querySelector('.popup__text--time');
    var features = clonedCard.querySelector('.popup__features');
    var description = clonedCard.querySelector('.popup__description');
    var photos = clonedCard.querySelector('.popup__photos');
    var img = photos.querySelector('img');
    var template = getPhotos(data);

    avatar.src = data.author.avatar;
    title.textContent = data.offer.title;
    address.textContent = data.offer.address;
    price.textContent = data.offer.price + ' ₽/ночь';
    type.textContent = data.offer.type;
    roomsNumber.textContent = data.offer.rooms;
    check.textContent = 'Заезд после ' + data.offer.checkin + ', ' + ' выезд до ' + data.offer.checkout;
    features.textContent = data.offer.features.join(',');
    description.textContent = data.offer.description;
    photos.replaceChild(template, img);
    return clonedCard;
  };

  window.card = {
    generate: generate,
  };
})();
