'use strict';

(function () {
  window.pin = {
    generate: function (pin, data, id) {
      var clonedElement = pin.cloneNode(true);
      clonedElement.style.left = data.location.x + clonedElement.querySelector('img').width + 'px';
      clonedElement.style.top = data.location.y + clonedElement.querySelector('img').height + 'px';
      clonedElement.querySelector('img').src = data.author.avatar;
      clonedElement.querySelector('img').alt = data.offer.title;
      clonedElement.classList.add('rendered-pin');
      clonedElement.setAttribute('id', id);
      return clonedElement;
    }
  };
})();
