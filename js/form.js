'use strict';

(function () {
  var BUNGALO_PRICE = 0;
  var FLAT_PRICE = 1000;
  var HOUSE_PRICE = 5000;
  var PALACE_PRICE = 10000;
  var INCORRECT_PRICE = 1000000;
  var MIN_NUMBER_TITLE = 29;
  var MAX_NUMBER_TITLE = 101;
  var TIME_EARLY = '12:00';
  var TIME_MIDDLE = '13:00';
  var TIME_LATE = '14:00';

  var roomsNode = document.querySelector('#room_number');
  var capacityOptionsNode = document.querySelector('#capacity').options;
  var addressFieldNode = document.querySelector('#address');
  var formNode = document.querySelector('.ad-form');
  var inputsNode = formNode.querySelectorAll('input');
  var fieldsetNode = formNode.querySelectorAll('fieldset');
  var resetBtnNode = document.querySelector('.ad-form__reset');
  var submitButton = document.querySelector('.ad-form__submit');

  capacityOptionsNode[2].selected = true;

  var setDisable = function (isActive) {
    if (!isActive) {
      formNode.classList.remove('ad-form--disabled');
      submitButton.disabled = false;
    } else {
      formNode.classList.add('ad-form--disabled');
    }
    for (var l = 0; l < fieldsetNode.length; l++) {
      fieldsetNode[l].disabled = isActive;
    }
  };
  var fillAddress = function (pinCoordinate) {
    addressFieldNode.value = pinCoordinate;
  };

  var enableTimeFields = function (caseValue) {
    for (var n = 0; n < timeoutOptions.length; n++) {
      if (timeoutOptions[n].value === caseValue || timeinOptions[n].value === caseValue) {
        timeoutOptions[n].selected = true;
        timeinOptions[n].selected = true;
        continue;
      }
    }
  };

  var disabledFieldRooms = function () {
    switch (roomsNode.value) {
      case ('1'): {
        for (var j = 0; j < capacityOptionsNode.length; j++) {
          if (capacityOptionsNode[j].value === '1') {
            capacityOptionsNode[j].disabled = false;
            capacityOptionsNode[j].selected = true;

            continue;
          }
          capacityOptionsNode[j].disabled = true;
        }
        break;
      }
      case ('2'): {
        for (var k = 0; k < capacityOptionsNode.length; k++) {
          if (capacityOptionsNode[k].value === '2' || capacityOptionsNode[k].value === '1') {
            capacityOptionsNode[k].disabled = false;
            capacityOptionsNode[k].selected = true;
            continue;
          }
          capacityOptionsNode[k].disabled = true;
        }
        break;
      }
      case ('3'): {
        for (var n = 0; n < capacityOptionsNode.length; n++) {
          if (capacityOptionsNode[n].value === '2' || capacityOptionsNode[n].value === '1' || capacityOptionsNode[n].value === '3') {
            capacityOptionsNode[n].disabled = false;
            capacityOptionsNode[n].selected = true;
            continue;
          }
          capacityOptionsNode[n].disabled = true;
        }
        break;
      }
      case ('100'): {
        for (var m = 0; m < capacityOptionsNode.length; m++) {
          if (capacityOptionsNode[m].value === '0') {
            capacityOptionsNode[m].disabled = false;
            capacityOptionsNode[m].selected = true;
            continue;
          }
          capacityOptionsNode[m].disabled = true;
        }
        break;
      }
    }
  };
  disabledFieldRooms();
  var adTitle = document.querySelector('#title');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var timeoutOptions = timeout.querySelectorAll('option');
  var timeinOptions = timein.querySelectorAll('option');
  var photoFile = document.querySelector('#images');
  var type = document.querySelector('#type');
  photoFile.accept = '.jpg, .png';
  var initPlaceHolder = price.placeholder;
  var highlightAdTitle = function (value) {
    if (!((/[a-zA-Zа-яА-Я]/).test(value))) {
      adTitle.classList.add('invalid');
      submitButton.disabled = true;
    } else if (value.length <= MIN_NUMBER_TITLE || value.length >= MAX_NUMBER_TITLE) {
      adTitle.classList.add('invalid');
      submitButton.disabled = true;
    } else {
      adTitle.classList.remove('invalid');
      submitButton.disabled = false;
    }
  };

  var isValidePrice = function (value) {
    value = parseInt(value, 10);
    if (!(/[0-9]/).test(value)) {
      return false;
    } else if (value >= INCORRECT_PRICE) {
      return false;
    } else if (value.length === 0) {
      return false;
    }
    return true;
  };

  var highlightTypeHousing = function (priceItem, typeHousing) {
    priceItem.classList.remove('invalid');
    submitButton.disabled = false;
    var isValid = isValidePrice(priceItem.value);
    if (!isValid) {
      priceItem.classList.add('invalid');
      submitButton.disabled = true;
    }
    switch (typeHousing.value) {
      case ('bungalo'):
        priceItem.classList.remove('invalid');
        priceItem.placeholder = BUNGALO_PRICE;
        if (!isValid) {
          priceItem.classList.add('invalid');
          submitButton.disabled = true;
          return;
        }
        break;
      case ('flat'):
        if (priceItem.value < FLAT_PRICE) {
          priceItem.classList.add('invalid');
          submitButton.disabled = true;
          priceItem.placeholder = FLAT_PRICE;
          if (!isValid) {
            priceItem.classList.add('invalid');
            submitButton.disabled = true;
            return;
          }
        }
        break;
      case ('house'):
        if (priceItem.value < HOUSE_PRICE) {
          priceItem.classList.add('invalid');
          submitButton.disabled = true;
          priceItem.placeholder = HOUSE_PRICE;
          if (!isValid) {
            priceItem.classList.add('invalid');
            submitButton.disabled = true;
            return;
          }
        }
        break;
      case ('palace'):
        if (priceItem.value < PALACE_PRICE) {
          priceItem.classList.add('invalid');
          submitButton.disabled = true;
          priceItem.placeholder = PALACE_PRICE;
          if (!isValid) {
            priceItem.classList.add('invalid');
            submitButton.disabled = true;
            return;
          }
        }
        break;
    }

  };

  var selectTimeField = function (time) {
    switch (time.value) {
      case (TIME_EARLY): {
        enableTimeFields(TIME_EARLY);
        break;
      }
      case (TIME_MIDDLE): {
        enableTimeFields(TIME_MIDDLE);
        break;
      }
      case (TIME_LATE): {
        enableTimeFields(TIME_LATE);
        break;
      }
    }
  };

  adTitle.addEventListener('focus', function () {
    adTitle.classList.remove('invalid');
    submitButton.disabled = false;
  });

  adTitle.addEventListener('blur', function () {
    highlightAdTitle(adTitle.value);
  });

  price.addEventListener('focus', function () {
    price.classList.remove('invalid');
    submitButton.disabled = false;
  });

  price.addEventListener('blur', function () {
    highlightTypeHousing(price, type);
  });

  type.addEventListener('change', function () {
    price.classList.remove('invalid');
    submitButton.disabled = false;
    highlightTypeHousing(price, type);
  });
  price.addEventListener('blur', function () {
    price.classList.remove('invalid');
    submitButton.disabled = false;
    highlightTypeHousing(price, type);
  });
  timein.addEventListener('change', function () {
    timein.classList.remove('invalid');
    submitButton.disabled = false;
    selectTimeField(timein);
  });
  timeout.addEventListener('change', function () {
    timeout.classList.remove('invalid');
    submitButton.disabled = false;
    selectTimeField(timeout);
  });
  roomsNode.addEventListener('change', function () {
    disabledFieldRooms();
  });

  var validate = function () {
    for (var i = 0; i < inputsNode.length; i++) {
      if (inputsNode[i].required && inputsNode[i].value === '' || inputsNode[i].classList.contains('invalid')) {
        return false;
      }
    } return true;
  };

  var pointEmptyFields = function () {
    for (var i = 0; i < inputsNode.length; i++) {
      if (inputsNode[i].required && inputsNode[i].value === '') {
        inputsNode[i].classList.add('invalid');
      }
    }
  };
  resetBtnNode.addEventListener('click', function () {
    formNode.reset();
    price.placeholder = initPlaceHolder;
    capacityOptionsNode[2].selected = true;
  });
  var removeInvalid = function () {
    inputsNode.forEach(function (item) {
      item.classList.remove('invalid');
    });
    price.placeholder = initPlaceHolder;
    capacityOptionsNode[2].selected = true;
  };

  window.form = {
    setDisable: setDisable,
    fillAddress: fillAddress,
    validate: validate,
    pointEmptyFields: pointEmptyFields,
    removeInvalid: removeInvalid
  };
})();
