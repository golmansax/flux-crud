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
