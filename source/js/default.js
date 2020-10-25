// burger & menu
const burger = document.querySelector('.burger');
const menuWrapper = document.querySelector('.header__wrapper-menu');

burger.onclick = function () {
  if (burger.classList.contains('burger--open')) {
    burger.classList.toggle('burger--close');
  } else {
    burger.classList.add('burger--open');
  }

  if (menuWrapper.style.maxHeight) {
    menuWrapper.style.maxHeight = null;
  } else {
    menuWrapper.style.maxHeight = ''.concat(menuWrapper.scrollHeight, 'px');
  }
};

// btn up

const btnUp = document.querySelector('.btn-up');
const btnUpLink = document.querySelector('.copyright__date > .copyright__link');
const headerLogo = document.querySelector('.header__logo');

btnUp.onclick = function () {
  topFunction(headerLogo);
};

btnUpLink.onclick = function () {
  topFunction(headerLogo);
};

btnUpLink.onkeyup = function (evt) {
  if (evt.keyCode === 13) {
    topFunction(headerLogo);
  }
};


function topFunction(element) {
  document.body.scrollTop = 0; // For Safari

  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  element.focus();
}
