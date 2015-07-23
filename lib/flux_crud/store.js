'use strict';

var { OrderedMap, Record } = require('immutable');
var { EventEmitter } = require('events');

class Store {
  constructor(props) {
    // required props: constants, dispatcher, defaultAttrs

    this._constants = props.constants;
    this._dispatchHandlers = {
      [this._constants.CREATE]: '_handleCreate',
      [this._constants.UPDATE]: '_handleUpdate'
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

  addRecordListener(key, listener) {
    this._emitter.on(key, listener);
  }

  removeRecordListener(key, listener) {
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
    this._storage = this._storage.remove(action.key);
    this._emitCollectionChange();
  }

  _handleUpdate(action) {
    var oldRecord = this._storage.get(action.key);
    var newRecord = oldRecord;

    Object.keys(action.attrs).forEach((attrKey) => {
      newRecord = newRecord.set(attrKey, action.attrs[attrKey]);
    });
    this._storage = this._storage.set(action.key, newRecord);

    // if changed, emit change
    if (newRecord !== oldRecord) { this._emitRecordChange(action.key); }
  }

  _emitRecordChange(key) {
    this._emitter.emit(key);
  }

  _emitCollectionChange() {
    this._emitter.emit('all');
  }
}

module.exports = Store;
