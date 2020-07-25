'use strict';

(function () {

  var card = document.querySelector('#card');
  var getPhotos = function (data) {
    var fragmentImgs = document.createDocumentFragment();
    var photos = data.offer.photos;
    photos.forEach(function (elem) {
      var clonedCard = card.content.cloneNode(true);
      var clonedPhotos = clonedCard.querySelector('.popup__photos');
      var img = clonedPhotos.querySelector('img');
      img.src = elem;
      fragmentImgs.appendChild(img);
    });
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

    if (data.author.avatar !== '') {
      avatar.src = data.author.avatar;
    } else {
      avatar.src = '';
    }
    if (data.offer.title !== '') {
      title.textContent = data.offer.title;
    } else {
      title.textContent = '';
    }
    if (data.offer.address !== '') {
      address.textContent = data.offer.address;
    } else {
      address.textContent = '';
    }
    if (data.offer.price !== '') {
      price.textContent = data.offer.price + ' ₽/ночь';
    } else {
      price.textContent = '';
    }
    if (data.offer.type !== '') {
      type.textContent = data.offer.type;
    } else {
      type.textContent = '';
    }
    if (data.offer.rooms !== '' && data.offer.rooms !== 0) {
      roomsNumber.textContent = data.offer.rooms;
    } else {
      roomsNumber.textContent = '';
    }
    if (data.offer.checkin !== '' && data.offer.checkin !== '0:00') {
      check.textContent = 'Заезд после ' + data.offer.checkin + ', ' + ' выезд до ' + data.offer.checkout;
    } else {
      check.textContent = '';
    }
    if (data.offer.features !== '' && data.offer.features !== 0) {
      features.textContent = data.offer.features.join(',');
    } else {
      features.textContent = '';
    }
    if (data.offer.description !== '') {
      description.textContent = data.offer.description;
    } else {
      description.textContent = '';
    }
    if (data.offer.photos !== '') {
      photos.replaceChild(template, img);
    } else {
      img.src = '';
    }
    return clonedCard;
  };

  window.card = {
    generate: generate,
  };
})();
