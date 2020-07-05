'use strict';

(function () {
  var rooms = document.querySelector('#room_number');
  var capacityOptions = document.querySelector('#capacity').options;

  var setDisableForm = function (isActive, fieldsets, tokens, form) {
    var formSelector = document.querySelector(form);
    var fieldsetSelector = formSelector.querySelectorAll(fieldsets);
    if (!isActive) {
      formSelector.classList.remove(tokens);
    }
    for (var l = 0; l < fieldsetSelector.length; l++) {
      fieldsetSelector[l].disabled = isActive;
    }
  };
  var fillAddress = function (selector, pin) {
    var mapPinMain = document.querySelector(pin);
    var addressField = document.querySelector(selector);
    addressField.placeholder = parseInt(mapPinMain.style.left, 10) + ', ' + parseInt(mapPinMain.style.top, 10);
  };

  rooms.addEventListener('change', function () {
    switch (rooms.value) {
      case ('1'): {
        for (var j = 0; j < capacityOptions.length; j++) {
          if (capacityOptions[j].text === 'для 1 гостя') {
            capacityOptions[j].disabled = false;
            continue;
          }
          capacityOptions[j].disabled = true;
        }
        break;
      }
      case ('2'): {
        for (var k = 0; k < capacityOptions.length; k++) {
          if (capacityOptions[k].text === 'для 2 гостей' || capacityOptions[k].text === 'для 1 гостя') {
            capacityOptions[k].disabled = false;
            continue;
          }
          capacityOptions[k].disabled = true;
        }
        break;
      }
      case ('3'): {
        for (var n = 0; n < capacityOptions.length; n++) {
          if (capacityOptions[n].text === 'для 2 гостей' || capacityOptions[n].text === 'для 1 гостя' || capacityOptions[n].text === 'для 3 гостей') {
            capacityOptions[n].disabled = false;
            continue;
          }
          capacityOptions[n].disabled = true;
        }
        break;
      }
      case ('100'): {
        for (var m = 0; m < capacityOptions.length; m++) {
          if (capacityOptions[m].text === 'не для гостей') {
            capacityOptions[m].disabled = false;
            continue;
          }
          capacityOptions[m].disabled = true;
        }
        break;
      }
    }
  });
  window.form = {
    setDisableForm: setDisableForm,
    fillAddress: fillAddress
  };
})();
