const menu = document.querySelector('.navdiv');
const hamburger = document.querySelector('.hamburger');

const dropDown = () => {
  if(!menu.classList.contains('show-menu')){
    menu.classList.add('show-menu');
    menu.classList.remove('hide-menu');
  } else {
    menu.classList.add('hide-menu');
    menu.classList.remove('show-menu');

  }
};

hamburger.addEventListener('click', dropDown);