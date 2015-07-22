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

    ACTIONS.forEach(function (action) {
      var constant = (prefix + '_' + action).toUpperCase();
      this[action.toUpperCase()] = constant;
    }.bind(this));
  }
}

module.exports = Constants;

},{}],2:[function(require,module,exports){
'use strict';

var OrderedMap = require('immutable').OrderedMap;

class Store {
  constructor(props) {
    this._attributes = props.attributes;
    this._constants = props.constants;
    this._idAttribute = props.idAttribute || 'id';
    this._dispatchHandlers = {
    };

    this._storage = new OrderedMap();
    this._emitter = {};

    props.dispatcher.register(this._handleDispatch.bind(this));
  }

  get(key) {
    return this._storage.get(id);
  }

  getAll() {
    return this._storage;
  }

  addListener(key) {
  }

  removeListener(key) {
  }

  addAllListener() {
  }

  removeAllListener() {
  }

  _handleDispatch(action) {
    this._dispatchHandlers[action.actionType](action);
  }
}

module.exports = Store;

},{"immutable":"immutable"}],"flux-crud-store":[function(require,module,exports){
'use strict';

var Store = require('./flux_crud/store');
//var Actions = require('./flux_crud/actions');
var Constants = require('./flux_crud/constants');

//module.exports = { Store: Store, Actions: Actions, Constants: Constants };
module.exports = { Store: Store, Constants: Constants };

},{"./flux_crud/constants":1,"./flux_crud/store":2}]},{},[]);
  return require('flux-crud-store');
}))
