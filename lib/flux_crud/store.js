'use strict';

var { OrderedMap, Record } = require('immutable');
var { EventEmitter } = require('events');

class Store {
  constructor(props) {
    // required props: constants, dispatcher
    // props.Record or props.defaultAttrs

    this._constants = props.constants;
    this._dispatchHandlers = {
      [this._constants.CREATE]: '_handleCreate',
      [this._constants.UPDATE]: '_handleUpdate',
      [this._constants.DESTROY]: '_handleDestroy'
    };
    this._Record = props.Record || Record(props.defaultAttrs);

    this._storage = new OrderedMap();
    this._emitter = new EventEmitter();
    this._emitter.setMaxListeners(100);

    props.dispatcher.register(this._handleDispatch.bind(this));

    // TODO remove
    this.addChangeListener = this.addCollectionListener;
    this.removeChangeListener = this.removeCollectionListener;
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
    if (this[functionName]) { this[functionName](action); }
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

    // If record changed, emit change
    if (newRecord !== oldRecord) {
      this._emitCollectionChange();
      this._emitRecordChange(action.key);
    }
  }

  _emitRecordChange(key) {
    this._emitter.emit(key);
  }

  _emitCollectionChange() {
    this._emitter.emit('all');
  }
}

module.exports = Store;
