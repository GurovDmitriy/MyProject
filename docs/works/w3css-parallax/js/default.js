"use strict";const burger=document.querySelector(".usr-burger"),menu=document.querySelector(".usr-nav__menu");burger.onclick=function(){burger.classList.contains("usr-burger--open")?burger.classList.toggle("usr-burger--close"):burger.classList.add("usr-burger--open"),menu.classList.toggle("usr-nav__menu--hidden")};const gallery=document.querySelector(".usr-gallery"),images=document.querySelectorAll(".w3-image"),overlay=document.querySelector(".w3-overlay");for(let i=0;i<images.length;i++)images[i].onclick=function(){images[i].classList.toggle("w3-image--show"),overlay.classList.toggle("usr-gallery__overlay--hidden"),overlay.onclick=function(){overlay.classList.add("usr-gallery__overlay--hidden"),images[i].classList.remove("w3-image--show")}},images[i].onkeyup=function(e){27===e.keyCode?(overlay.classList.add("usr-gallery__overlay--hidden"),images[i].classList.remove("w3-image--show")):13===e.keyCode&&(overlay.classList.remove("usr-gallery__overlay--hidden"),images[i].classList.add("w3-image--show"))},images[i].onblur=function(){overlay.classList.add("usr-gallery__overlay--hidden"),images[i].classList.remove("w3-image--show")};function myFunction(){const navbar=document.querySelector(".usr-nav");document.body.scrollTop>100||document.documentElement.scrollTop>100?(navbar.className="w3-top w3-card w3-white usr-nav",menu.classList.add("w3-animate-top")):(navbar.className=navbar.className.replace("w3-top w3-card w3-white usr-nav","w3-top usr-nav"),menu.classList.remove("w3-animate-top"))}window.onscroll=function(){myFunction()};const sections=document.querySelectorAll("div[id]"),menu_links=document.querySelectorAll(".usr-nav__menu a"),makeActive=link=>menu_links[link].classList.add("w3-light-grey"),removeActive=link=>menu_links[link].classList.remove("w3-light-grey"),removeAllActive=()=>[...Array(sections.length).keys()].forEach(link=>removeActive(link)),sectionMargin=100;let currentActive=0;window.addEventListener("scroll",()=>{const current=sections.length-[...sections].reverse().findIndex(section=>window.scrollY>=section.offsetTop-100)-1;current!==currentActive&&(removeAllActive(),currentActive=current,makeActive(current))});