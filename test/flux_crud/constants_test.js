'use strict';

var { Constants } = require('../../lib/index');

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;

describe('flux_crud/constants', () => {
  var constants;

  beforeEach(function () {
    constants = new Constants({ prefix: 'todo' });
  });

  describe('#instance', () => {
    it('creates a hash with all of the actions as keys', () => {
      expect(constants).to.include.keys([
        'UPDATE',
        'DESTROY',
        'CREATE'
      ]);
    });

    it('does not include extra keys', () => {
      expect(Object.keys(constants).length).to.equal(3);
    });

    it('creates a hash where the values are the keys plux prefix', () => {
      Object.keys(constants).forEach((key) => {
        expect(constants[key]).to.equal(`TODO_${key}`);
      });
    });
  });
});
