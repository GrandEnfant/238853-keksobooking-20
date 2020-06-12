'use strict';
var OBJECTS_NUMBER = 8;
var map = document.querySelector('.map');
var generateRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
var CHOCKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};


var getAvatar = function () {
  var listAvatars = [];
  var listSrcAvatar = [];
  for (var i = 0; listAvatars.length < 8; i++) {
    var random = generateRandom(1, 9);
    if (!listAvatars.includes(random)) {
      var addressAvatar = 'img/avatars/user0' + random + '.png';
      listAvatars.push(random);
      listSrcAvatar.push(addressAvatar);
    }
  }
  return listSrcAvatar;
};

var getValueType = function () {
  var keysType = Object.keys(TYPES);
  var random = generateRandom(0, keysType.length);
  var key = keysType[random];
  return TYPES[key];
};

var generateObjects = function () {
  var objects = [];
  var listAvatarsSrc = getAvatar();
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    var locationX = generateRandom(0, map.offsetWidth);
    var locationY = generateRandom(130, 630);
    objects[i] = {
      author: {
        avatar: listAvatarsSrc[i],
      },
      offer: {
        title: 'Очень большой дом',
        address: locationX + locationY,
        price: generateRandom(10, 10000),
        type: getValueType(),
        rooms: generateRandom(1, 10),
        guests: generateRandom(0, 10),
        checkin: CHECKINS[generateRandom(0, CHECKINS.length)],
        checkout: CHOCKOUTS[generateRandom(0, CHOCKOUTS.length)],
        features: FEATURES,
        description: 'Как 224этажка в Мурино',
        photos: PHOTOS,
      },
      location: {
        x: locationX,
        y: locationY,
      }
    };
  }
  return objects;
};

var arrayData = generateObjects();
var pinButton = document.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var fragmentPins = document.createDocumentFragment();

var getPin = function (data) {
  var clonedElement = pinButton.cloneNode(true);
  clonedElement.style.left = data.location.x + clonedElement.querySelector('img').width + 'px';
  clonedElement.style.top = data.location.y + clonedElement.querySelector('img').height + 'px';
  clonedElement.querySelector('img').src = data.author.avatar;
  clonedElement.querySelector('img').alt = data.offer.title;
  return clonedElement;
};

for (var i = 0; i < arrayData.length; i++) {
  var pin = getPin(arrayData[i]);
  fragmentPins.appendChild(pin);
}

mapPin.appendChild(fragmentPins);
map.classList.remove('map--faded');


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
var dataCard = getCard(arrayData);
var filtersContainer = document.querySelector('.map__filters-container');
filtersContainer.appendChild(dataCard);
