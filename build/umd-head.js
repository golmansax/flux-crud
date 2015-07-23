(function(root, factory) {
  if(typeof exports === 'object') {
    module.exports = factory(require('immutable'));
  } else if(typeof define === 'function' && define.amd) {
    define(['immutable'], factory);
  } else {
    root.FluxCrud = factory(root.Immutable);
  }
}(this || window, function(Immutable) {
  var require = function(name) {
    return {'immutable': Immutable}[name];
  };
