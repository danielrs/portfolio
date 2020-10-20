import {Element, ClassToggler} from '../util';

export default class MainView {
  mount() {
    setupNavToggle();
  }

  unmount() {}
}

function setupNavToggle() {
  const nav = new Element('#nav');
  const navlist = new Element('#nav .nav__list');
  const menuToggle = new Element('#menu-toggle');

  menuToggle.first().addEventListener('click', function() {
    nav.toggleClass('nav--hidden');
  });
  nav.addClass('nav--hidden');
}
