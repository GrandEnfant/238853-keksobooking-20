'use strict';

(function () {
  var OBJECTS_NUMBER = 8;

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

  var generateRandom = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var getObjectValue = function (obj) {
    var keysType = Object.keys(obj);
    var random = generateRandom(0, keysType.length);
    var key = keysType[random];
    return obj[key];
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
  var getKeyList = function (obj) {
    var list = [];
    for (var i = 0; i < obj.length; i++) {
      var keysType = Object.keys(obj);
      var key = keysType[i];
      var currentValue = obj[key];
      list.push(currentValue);
    }
    return list;
  };
  window.generateObjects = function () {
    var objects = [];
    var listAvatarsSrc = getAvatar();
    for (var i = 0; i < OBJECTS_NUMBER; i++) {
      var locationX = generateRandom(0, window.map.offsetWidth);
      var locationY = generateRandom(130, 630);
      objects[i] = {
        author: {
          avatar: listAvatarsSrc[i],
        },
        offer: {
          title: 'Очень большой дом',
          address: locationX + locationY,
          price: generateRandom(10, 10000),
          type: getObjectValue(TYPES),
          rooms: generateRandom(1, 10),
          guests: generateRandom(0, 10),
          checkin: CHECKINS[generateRandom(0, CHECKINS.length)],
          checkout: CHOCKOUTS[generateRandom(0, CHOCKOUTS.length)],
          features: getKeyList(FEATURES),
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
})();
