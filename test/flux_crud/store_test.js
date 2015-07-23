'use strict';

var { Store, Actions, Constants } = require('../../lib/index');
var { OrderedMap, Record } = require('immutable');
var dispatcher = require('../support/dispatcher');

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

describe('flux_crud/store', () => {
  var store;
  var actions;

  beforeEach(() => {
    var constants = new Constants({ prefix: 'todo' });

    store = new Store({
      constants: constants,
      dispatcher: dispatcher,
      defaultAttrs: { id: null, name: '' }
    });

    actions = new Actions({
      constants: constants,
      dispatcher: dispatcher
    });

    actions.create(1, { name: 'eat cookies' });
    actions.create(2, { name: 'watch movie' });
  });

  describe('#get', () => {
    it('returns a Record instance', () => {
      expect(store.get(1)).to.be.an.instanceOf(Record);
    });
  });

  describe('#getAll', () => {
    it('returns a OrderedMap instance', () => {
      expect(store.getAll()).to.be.an.instanceOf(OrderedMap);
    });

    it('returns all of the records', () => {
      var names = store.getAll().valueSeq().map((record) => {
        return record.get('name');
      }).toJS();
      expect(names).to.deep.equal(['eat cookies', 'watch movie']);
    });
  });

  describe('#addRecordListener', () => {
    var listener;

    beforeEach(() => {
      listener = sinon.spy();
    });

    it('calls the listener when the registered record changes', () => {
      store.addRecordListener(1, listener);

      actions.update(1, { name: 'play music' });
      expect(listener).to.have.been.called();
    });

    it('does not call the listener when another record changes', () => {
      store.addRecordListener(1, listener);

      actions.update(2, { name: 'play music' });
      expect(listener).not.to.have.been.called();
    });

    it('does not call the listener when the record does not change', () => {
      store.addRecordListener(1, listener);

      actions.update(1, { name: 'eat cookies' });
      expect(listener).not.to.have.been.called();
    });
  });

  describe('#removeRecordListener', () => {
    var listener;

    beforeEach(() => {
      listener = sinon.spy();
    });

    it('removes the registered listener', () => {
      store.addRecordListener(1, listener);

      actions.update(1, { name: 'play music' });
      expect(listener).to.have.been.called();

      store.removeRecordListener(1, listener);
      listener.reset();
      actions.update(1, { name: 'eat pizza' });
      expect(listener).not.to.have.been.called();
    });
  });

  describe('#addCollectionListener', () => {
    var listener;

    beforeEach(() => {
      listener = sinon.spy();
      store.addCollectionListener(listener);
    });

    it('calls the listener when a record is created', () => {
      actions.create(3, { name: 'learn ocaml' });
      expect(listener).to.have.been.called();
    });

    it('calls the listener when a record is updated', () => {
      actions.update(1, { name: 'learn ocaml' });
      expect(listener).to.have.been.called();
    });

    it('calls the listener when a record is destroyed', () => {
      actions.destroy(1);
      expect(listener).to.have.been.called();
    });
  });

  describe('#removeCollectionListener', () => {
  });
});
