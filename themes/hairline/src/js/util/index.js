// Import and re-export.

import Element from './element';
import ClassToggler from './classToggler';
export {Element, ClassToggler};

// ----------------
// Functions
// ----------------

// Calls the function f on each element of the given array.
// returning a new array with the new values.
export function map(array, f) {
  return Array.prototype.map.call(array, f);
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
