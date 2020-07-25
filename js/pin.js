'use strict';

(function () {
  window.pin = {
    generate: function (pin, data, id) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var clonedElement = pinTemplate.cloneNode(true);
      var ClonedIMGNode = clonedElement.querySelector('img');
      clonedElement.style.left = data.location.x + ClonedIMGNode.width + 'px';
      clonedElement.style.top = data.location.y + ClonedIMGNode.height + 'px';
      ClonedIMGNode.src = data.author.avatar;
      ClonedIMGNode.alt = data.offer.title;
      clonedElement.classList.add('rendered-pin');
      clonedElement.classList.remove('map__pin--main');
      clonedElement.setAttribute('id', id);
      return clonedElement;
    }
  };
})();
