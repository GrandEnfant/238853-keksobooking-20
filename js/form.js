'use strict';

(function () {
  var rooms = document.querySelector('#room_number');
  var capacityOptions = document.querySelector('#capacity').options;
  var addressFieldNode = document.querySelector('#address');
  var formNode = document.querySelector('.ad-form');
  var fieldsetNode = formNode.querySelectorAll('fieldset');

  var setDisableForm = function (isActive) {
    if (!isActive) {
      formNode.classList.remove('ad-form--disabled');
    }
    for (var l = 0; l < fieldsetNode.length; l++) {
      fieldsetNode[l].disabled = isActive;
    }
  };
  var fillAddress = function (pinCoordinate) {
    addressFieldNode.placeholder = pinCoordinate;
  };

  rooms.addEventListener('change', function () {
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
  });
  var adTitle = document.querySelector('#title');
  var price = document.querySelector('#price');
  price.required = true;
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var timeoutOptions = timeout.querySelectorAll('option');
  var photoFile = document.querySelector('#images');
  var type = document.querySelector('#type');
  photoFile.accept = '.jpg, .png';

  var validateAdTitle = function (value) {
    if (!(/[a-zA-Zа-яА-Я]/).test(value) === true) {
      adTitle.style.outline = '2px solid red';
    } else if (value.length < 30 || value.length > 100) {
      adTitle.style.outline = '2px solid red';
    }
  };

  var validatePrice = function (value) {
    if ((/[0-1]/).test(value)) {
      price.style.outline = '2px solid red';
    } else if (value > 1000000) {
      price.style.outline = '2px solid red';
    } else if (value.length === 0) {
      price.style.outline = '2px solid red';
    }
  };

  var validateTypePrice = function () {
    switch (type.value) {
      case ('bungalo'):
        price.style.outline = '';
        break;
      case ('flat'):
        if (price.value < 1000) {
          price.style.outline = '2px solid red';
        } else {
          price.style.outline = '';
        }
        break;
      case ('house'):
        if (price.value < 5000) {
          price.style.outline = '2px solid red';
        } else {
          price.style.outline = '';
        }
        break;
      case ('palace'):
        if (price.value < 10000) {
          price.style.outline = '2px solid red';
        } else {
          price.style.outline = '';
        }
        break;
    }
  };

  var validateTime = function () {
    switch (timein.value) {
      case ('12:00'): {
        for (var n = 0; n < timeoutOptions.length; n++) {
          if (timeoutOptions[n].value === '12:00') {
            timeoutOptions[n].disabled = false;
            timeoutOptions[n].selected = true;
            continue;
          }
          timeoutOptions[n].disabled = true;
        }
        break;
      }
      case ('13:00'): {
        for (var j = 0; j < timeoutOptions.length; j++) {
          if (timeoutOptions[j].value === '13:00') {
            timeoutOptions[j].disabled = false;
            timeoutOptions[j].selected = true;
            continue;
          }
          timeoutOptions[j].disabled = true;
        }
        break;
      }
      case ('14:00'): {
        for (var k = 0; k < timeoutOptions.length; k++) {
          if (timeoutOptions[k].value === '14:00') {
            timeoutOptions[k].disabled = false;
            timeoutOptions[k].selected = true;
            continue;
          }
          timeoutOptions[k].disabled = true;
        }
        break;
      }
    }
  };

  adTitle.addEventListener('focus', function () {
    adTitle.style.outline = '';
  });

  adTitle.addEventListener('blur', function () {
    validateAdTitle(adTitle.value);
  });

  price.addEventListener('focus', function () {
    price.style.outline = '';
  });

  price.addEventListener('blur', function () {
    validatePrice(price.value);
  });

  type.addEventListener('change', function () {
    price.style.outline = '';
    validateTypePrice();
  });
  price.addEventListener('blur', function () {
    price.style.outline = '';
    validateTypePrice();
  });
  timein.addEventListener('change', function () {
    timein.style.outline = '';
    validateTime();
  });
  timeout.addEventListener('blur', function () {
    timeout.style.outline = '';
    validateTime();
  });

  window.form = {
    setDisableForm: setDisableForm,
    fillAddress: fillAddress
  };
})();
