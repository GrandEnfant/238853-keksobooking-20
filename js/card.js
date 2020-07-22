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

    data.author.avatar !== '' ? avatar.src = data.author.avatar : avatar.src = '';
    data.offer.title !== '' ? title.textContent = data.offer.title : title.textContent = '';
    data.offer.address !== '' ? address.textContent = data.offer.address : address.textContent = '';
    data.offer.price !== '' ?  price.textContent = data.offer.price + ' ₽/ночь' : price.textContent = '';
    data.offer.type !== '' ?  type.textContent = data.offer.type : type.textContent = '';
    data.offer.rooms !== '' && data.offer.rooms !== 0 ? roomsNumber.textContent = data.offer.rooms : roomsNumber.textContent = '';
    data.offer.checkin !== '' && data.offer.checkin !== '0:00' ? check.textContent = 'Заезд после ' + data.offer.checkin + ', ' + ' выезд до ' + data.offer.checkout : check.textContent = '';
    data.offer.features !== '' && data.offer.features !== 0 ?  features.textContent = data.offer.features.join(',') : features.textContent = '';
    data.offer.description !== '' ?  description.textContent = data.offer.description : description.textContent = '';
    data.offer.photos !== '' ? photos.replaceChild(template, img) : img.src = '';
    return clonedCard;
  };

  window.card = {
    generate: generate,
  };
})();
