'use strict';

var { Store, Actions, Constants } = require('../../lib/index');
var { Record } = require('immutable');
var dispatcher = require('../support/dispatcher');

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;

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
  });

  describe('#get', () => {
    it('returns a Record instance', () => {
      actions.create(1, { name: 'eat cookies' });
      expect(store.get(1)).to.be.an.instanceOf(Record);
    });
  });

});
