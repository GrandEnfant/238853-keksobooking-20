'use strict';

(function () {
  var rooms = document.querySelector('#room_number');
  var capacityOptions = document.querySelector('#capacity').options;
  var addressFieldNode = document.querySelector('#address');
  var formNode = document.querySelector('.ad-form');
  var inputsNode = formNode.querySelectorAll('input');
  var fieldsetNode = formNode.querySelectorAll('fieldset');
  var formResetBtn = document.querySelector('.ad-form__reset');
  var submitButton = document.querySelector('.ad-form__submit');
  var setDisableForm = function (isActive) {
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
    addressFieldNode.placeholder = pinCoordinate;
  };

  var enableTimeFields = function (caseValue) {
    for (var n = 0; n < timeoutOptions.length; n++) {
      if (timeoutOptions[n].value === caseValue) {
        timeoutOptions[n].disabled = false;
        timeoutOptions[n].selected = true;
        continue;
      }
      timeoutOptions[n].disabled = true;
    }
  };

  var disabledFieldRooms = function () {
    switch (rooms.value) {
      case ('1'): {
        for (var j = 0; j < capacityOptions.length; j++) {
          if (capacityOptions[j].value === '1') {
            capacityOptions[j].disabled = false;
            capacityOptions[j].selected = true;

            continue;
          }
          capacityOptions[j].disabled = true;
        }
        break;
      }
      case ('2'): {
        for (var k = 0; k < capacityOptions.length; k++) {
          if (capacityOptions[k].value === '2' || capacityOptions[k].value === '1') {
            capacityOptions[k].disabled = false;
            capacityOptions[k].selected = true;
            continue;
          }
          capacityOptions[k].disabled = true;
        }
        break;
      }
      case ('3'): {
        for (var n = 0; n < capacityOptions.length; n++) {
          if (capacityOptions[n].value === '2' || capacityOptions[n].value === '1' || capacityOptions[n].value === '3') {
            capacityOptions[n].disabled = false;
            capacityOptions[n].selected = true;
            continue;
          }
          capacityOptions[n].disabled = true;
        }
        break;
      }
      case ('100'): {
        for (var m = 0; m < capacityOptions.length; m++) {
          if (capacityOptions[m].value === '0') {
            capacityOptions[m].disabled = false;
            capacityOptions[m].selected = true;
            continue;
          }
          capacityOptions[m].disabled = true;
        }
        break;
      }
    }
  };
  var adTitle = document.querySelector('#title');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var timeoutOptions = timeout.querySelectorAll('option');
  var photoFile = document.querySelector('#images');
  var type = document.querySelector('#type');
  photoFile.accept = '.jpg, .png';

  var highlightAdTitle = function (value) {
    if (!((/[a-zA-Zа-яА-Я]/).test(value))) {
      adTitle.classList.add('invalid');
      submitButton.disabled = true;
    } else if (!(value.length < 30 || value.length > 100)) {
      adTitle.classList.add('invalid');
      submitButton.disabled = true;
    } else if ((/[0-9]/).test(value)) {
      adTitle.classList.add('invalid');
      submitButton.disabled = true;
    } else {
      adTitle.classList.remove('invalid');
      submitButton.disabled = false;
    }
  };

  var highlightPrice = function (value) {
    if ((/[0-1]/).test(value)) {
      price.classList.add('invalid');
      submitButton.disabled = true;
    } else if (value > 1000000) {
      price.classList.add('invalid');
      submitButton.disabled = true;
    } else if (value.length === 0) {
      price.classList.add('invalid');
      submitButton.disabled = true;
    }
  };

  var highlightTypeHousing = function (typeHousing) {
    price.classList.remove('invalid');
    submitButton.disabled = false;
    switch (typeHousing.value) {
      case ('bungalo'):
        price.classList.remove('invalid');
        break;
      case ('flat'):
        if (price.value < 1000) {
          price.classList.add('invalid');
          submitButton.disabled = true;
        }
        break;
      case ('house'):
        if (price.value < 5000) {
          price.classList.add('invalid');
          submitButton.disabled = true;
        }
        break;
      case ('palace'):
        if (price.value < 10000) {
          price.classList.add('invalid');
          submitButton.disabled = true;
        }
        break;
    }
  };

  var disabledTimeField = function (time) {
    switch (time.value) {
      case ('12:00'): {
        enableTimeFields('12:00');
        break;
      }
      case ('13:00'): {
        enableTimeFields('13:00');
        break;
      }
      case ('14:00'): {
        enableTimeFields('14:00');
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
    highlightPrice(price.value);
  });

  type.addEventListener('change', function () {
    price.classList.remove('invalid');
    submitButton.disabled = false;
    highlightTypeHousing(type);
  });
  price.addEventListener('blur', function () {
    price.classList.remove('invalid');
    submitButton.disabled = false;
    highlightTypeHousing(price);
  });
  timein.addEventListener('change', function () {
    timein.classList.remove('invalid');
    submitButton.disabled = false;
    disabledTimeField(timein);
  });
  timeout.addEventListener('blur', function () {
    timeout.classList.remove('invalid');
    submitButton.disabled = false;
    disabledTimeField(timeout);
  });
  rooms.addEventListener('change', function () {
    disabledFieldRooms();
  });

  var validateForm = function () {
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
  formResetBtn.addEventListener('click', function () {
    formNode.reset();
  });

  window.form = {
    setDisableForm: setDisableForm,
    fillAddress: fillAddress,
    validateForm: validateForm,
    pointEmptyFields: pointEmptyFields,
  };
})();
