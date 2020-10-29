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
const headerLogo = document.querySelector('.header__logo');

btnUp.onclick = function () {
  topFunction(headerLogo);
};


function topFunction(element) {
  document.body.scrollTop = 0; // For Safari

  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  element.focus();
}

// tooltip

const tooltipLink = document.querySelectorAll('a:not([href]):not(.menu__link)');
const tolltipTag = 'span';
const tolltipClass = 'tooltip';

for (let i = 0; i < tooltipLink.length; i++) {

  tooltipLink[i].onclick = function() {
    tooltip(tooltipLink, i, tolltipTag, tolltipClass);
  };

  tooltipLink[i].onkeyup = function(evt) {
    if(evt.keyCode === 13) {
      tooltip(tooltipLink, i, tolltipTag, tolltipClass);
    }
  };
};


function tooltip(tlLink, i, tlTag, tlClass) {

  if (!tlLink[i].querySelector(tlTag + '.' + tlClass)) {

    tlLink[i].style.position = 'relative';
    let tooltip = document.createElement(tlTag);

    tooltip.textContent ='уже тут';

    tooltip.setAttribute('class', tlClass);
    tlLink[i].appendChild(tooltip);

    setTimeout(function() {
      tlLink[i].removeChild(tooltip);
      tlLink[i].removeAttribute('style');
    }, 2000);
  }
}
