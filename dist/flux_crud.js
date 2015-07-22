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
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ACTIONS = ['create', 'destroy', 'update'];

class Constants {
  constructor(props) {
    var prefix = props.prefix;

    for (var i = 0; i < ACTIONS.length; i++) {
      var constant = (prefix + '_' + ACTIONS[i]).toUpperCase();
      this[constant] = constant;
    }
  }
}

module.exports = Constants;

},{}],"flux-crud-store":[function(require,module,exports){
'use strict';

//var Store = require('./flux_crud/store');
//var Actions = require('./flux_crud/actions');
var Constants = require('./flux_crud/constants');

//module.exports = { Store: Store, Actions: Actions, Constants: Constants };
module.exports = { Constants: Constants };

},{"./flux_crud/constants":1}]},{},[]);
  return require('flux-crud-store');
}))
