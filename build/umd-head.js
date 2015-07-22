(function(root, factory) {
  if(typeof exports === 'object') {
    module.exports = factory(require('immutable'));
  } else if(typeof define === 'function' && define.amd) {
    define(['immutable'], factory);
  } else {
    root.FluxCrudStore = factory(root.Immutable);
  }
}(this, function(Immutable) {
  var require = function(name) {
    return {'immutable': Immutable}[name];
  };
