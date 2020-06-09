'use strict';
var OBJECTS_NUMBER = 8;
var map = document.querySelector('.map');
var generateRandom = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
var chekins = [
  '12:00',
  '13:00',
  '14:00'
];
var checkouts = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var avatarsNumber = [];

var getLocations = function () {
  var locationArray = [];
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    locationArray[i] = {x: generateRandom(0, map.offsetWidth), y: generateRandom(130, 630)}
  }
  console.log(locationArray);
  return locationArray;
};

var getAvatar = function () {
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

var generateObjects = function () {
  var objectsArray = [];
  var locations = getLocations();
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    objectsArray[i] = {
      author: {
        avatar: getAvatar(),
      },
      offer: {
        title: 'Очень большой дом',
        address: locations[i],
        price: generateRandom(10, 10000),
        type: generateRandom(1, 5),
        rooms: generateRandom(0, 10),
        guests: generateRandom(0, 10),
        checkin: chekins[generateRandom(0, chekins.length)],
        checkout: checkouts[generateRandom(0, checkouts.length)],
        features: features,
        description: 'Как 224этажка в Мурино',
        photos: photos,
      },
      location: {
        x: locations[i].x,
        y: locations[i].y,
      }
    };
  }
  console.log(objectsArray);
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
}

mapPins.appendChild(fragmentPins);
map.classList.remove('map--faded');
