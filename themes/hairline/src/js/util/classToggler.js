import {Element} from './element';

export default class ClassToggler {
  constructor(selector) {
    this.el = new Element(selector);
    this.onClasses = '';
    this.offClasses = '';
  }

  on(classes) {
    this.onClasses = classes;
    this.el.removeClass(this.offClasses);
    this.el.addClass(this.onClasses);
  }

  off(classes) {
    this.offClasses = classes;
    this.el.removeClass(this.onClasses);
    this.el.addClass(this.offClasses);
  }
}
