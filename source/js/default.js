'use strict'
// burger
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');

burger.onclick = function () {
  if (burger.classList.contains('burger--open')) {
    burger.classList.toggle('burger--close');
  } else {
    burger.classList.add('burger--open');
  }

  menu.classList.toggle('menu--open');
}

// btn up
const btnUp = document.querySelector('.btn-up');
const headerLogo = document.querySelector('.header__logo');

btnUp.onclick = function() {topFunction(headerLogo)};

function topFunction(element) {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  element.focus();
}
