'use strict';

var { OrderedMap, Record } = require('immutable');
var { EventEmitter } = require('events');

class Store {
  constructor(props) {
    // required props: constants, dispatcher, defaultAttrs

    this._constants = props.constants;
    this._dispatchHandlers = {
      [this._constants.CREATE]: '_handleCreate'
    };
    this._Record = Record(props.defaultAttrs);

    this._storage = new OrderedMap();
    this._emitter = new EventEmitter();

    props.dispatcher.register(this._handleDispatch.bind(this));
  }

  get(key) {
    return this._storage.get(key);
  }

  getAll() {
    return this._storage;
  }

  addListener(key, listener) {
    this._emitter.on(key, listener);
  }

  removeListener(key, listener) {
    this._emitter.removeListener(key, listener);
  }

  addCollectionListener(listener) {
    this._emitter.on('all', listener);
  }

  removeCollectionListener(listener) {
    this._emitter.removeListener('all', listener);
  }

  _handleDispatch(action) {
    var functionName = this._dispatchHandlers[action.actionType];
    this[functionName](action);
  }

  _handleCreate(action) {
    this._storage = this._storage.set(
      action.key,
      new this._Record(action.attrs)
    );
    this._emitCollectionChange();
  }

  _handleDestroy(action) {
    this._storage = this._storage.delete(action.key);
    this._emitCollectionChange();
  }

  _handleUpdate(action) {
    var record = this._storage.get(action.key);
    Object.keys(action.attrs).forEach((key) => {
      record = record.set(key, action.attrs[key]);
    });
    this._storage = this._storage.set(action.key, record);
    // if changed, emit change
  }

  _emitCollectionChange() {
    this._emitter.emit('all');
  }
}

module.exports = Store;
