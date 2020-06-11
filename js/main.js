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
  '14:00'
];
var CHOCKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
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


var getLocations = function () {
  var locationArray = [];
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    locationArray[i] = {x: generateRandom(0, map.offsetWidth), y: generateRandom(130, 630)}
  }
  console.log(locationArray);
  return locationArray;
};


var getAvatar = function () {
  var avatarsNumber = []; // is global variable??
  while (avatarsNumber.length < 8) {
    var randomNumber = generateRandom(1, 9);
    if (avatarsNumber.includes(randomNumber)) {
      continue;
    } else {
      var addressAvatar = 'img/avatars/user0' + randomNumber + '.png';
      avatarsNumber.push(randomNumber);
      break;
    }
  }
  return addressAvatar;
};

var getValueType = function () {
  var keysTypes = Object.keys(TYPES);
  var random = generateRandom(0, keysTypes.length);
  var key = keysTypes[random];
  return TYPES[key];
};


var generateObjects = function () {
  var objectsArray = [];
  var locationX = getLocations(0, map.offsetWidth);
  var locationY = getLocations(130, 630);
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    objectsArray[i] = {
      author: {
        avatar: getAvatar(),
      },
      offer: {
        title: 'Очень большой дом',
        address: locationX + locationY,
        price: generateRandom(10, 10000),
        type:  getValueType(),
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
  return objectsArray;
};

var arrayData = generateObjects();
var pinButton = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
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
  console.log(fragmentPins);
}

mapPins.appendChild(fragmentPins);
map.classList.remove('map--faded');

var card = document.querySelector('#card');
var getCard = function (data) {
var clonedCard = card.content.cloneNode(true);
var photos =  data[0].offer.photos;
var fragmentImg = document.createDocumentFragment();

  var getPhotos = function () {
    var clonedPhotos = clonedCard.querySelector('.popup__photos');
    var clonedImg = clonedPhotos.querySelector('img');
    for(var i = 0; i < photos.length; i++) {
      clonedImg.src = photos[i];
      fragmentImg.appendChild(clonedImg);
      console.log(fragmentImg);
    }
    return fragmentImg;
  };

  console.log(clonedCard);
  var title = clonedCard.querySelector('.popup__title');
  console.log(title);
  title.textContent = data[0].offer.title;

  var address = clonedCard.querySelector('.popup__text--address');
  address.textContent = data[0].offer.address;
  console.log(address);

  var price = clonedCard.querySelector('.popup__text--price');
  price.textContent = data[0].offer.price + '₽/ночь';
  console.log(price);

  var type = clonedCard.querySelector('.popup__type');
  console.log( data[0].offer.type);
  type.textContent = data[0].offer.type;
  console.log(type);

  var roomsNumber = clonedCard.querySelector('.popup__text--capacity');
  console.log(roomsNumber);
  roomsNumber.textContent = data[0].offer.rooms;
  console.log(roomsNumber);

  var check = clonedCard.querySelector('.popup__text--time');
  check.textContent = 'Заезд после ' + data[0].offer.checkin + ', ' + ' выезд до ' + data[0].offer.checkout;
  console.log(check);

  var features = clonedCard.querySelector('.popup__features');
  features.textContent = data[0].offer.features.join(', ');
  console.log(features);

  var description = clonedCard.querySelector('.popup__description');
  description.textContent = data[0].offer.description;
  console.log(description);
  // getPhotos();
  // clonedCard.querySelector('img').src = data[0].author.avatar;


  console.log(getPhotos());

  // photos = getPhotos();
// console.log(photos)
};
getCard(arrayData);
