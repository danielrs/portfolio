import {map} from './index';

// Helper functions for manipulating classes.

export function hasClass(el, classname) {
  if (el.classList) {
    return el.classList.contains(classname);
  }

  return new RegExp('(^| )' + classname + '( |$)', 'gi').test(el.classname);
}

export function addClass(el, classname) {
  if (el.classList) {
    el.classList.add(classname);
    return;
  }

  el.classname += ' ' + classname;
}

export function removeClass(el, classname) {
  if (el.classList) {
    el.classList.remove(classname);
    return;
  }

  el.classname = el.classname.replace(
    new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi', ' ')
  );
}

export function toggleClass(el, classname) {
  hasClass(el, classname) ? removeClass(el, classname) : addClass(el, classname)
}

// Class manipulation on multiple elements.
export default class Element {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
  }

  first() {
    return this.elements[0];
  }

  hasClass(classes) {
    if (this.elements.length == 0) {
      return false;
    }

    const el = this.elements[0];
    return classes.split(' ').some(c => hasClass(el, c))
  }

  addClass(classes) {
    if (!classes) {
      return
    }

    classes = classes.split(' ');
    map(this.elements, el => {
      map(classes, c => addClass(el, c));
    });
  }

  removeClass(classes) {
    if (!classes) {
      return
    }

    classes = classes.split(' ');
    map(this.elements, el => {
      map(classes, c => removeClass(el, c));
    });
  }

  toggleClass(classes) {
    if (!classes) {
      return
    }

    classes = classes.split(' ');
    map(this.elements, el => {
      map(classes, c => toggleClass(el, c));
    });
  }
}
