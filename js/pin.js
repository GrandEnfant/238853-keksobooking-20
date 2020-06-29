'use strict';

(function () {
  window.pin = {
    getPin: function (pin, data) {
      var clonedElement = pin.cloneNode(true);
      clonedElement.style.left = data.location.x + clonedElement.querySelector('img').width + 'px';
      clonedElement.style.top = data.location.y + clonedElement.querySelector('img').height + 'px';
      clonedElement.querySelector('img').src = data.author.avatar;
      clonedElement.querySelector('img').alt = data.offer.title;
      return clonedElement;
    }
  };
})();
