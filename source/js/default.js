'use strict'

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
