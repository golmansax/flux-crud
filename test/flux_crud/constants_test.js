'use strict';

var Constants = require('../../lib/index').Constants;

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;

describe('flux_crud/constants', function () {
  var constants;

  beforeEach(function () {
    constants = new Constants({ prefix: 'todo' });
  });

  describe('#instance', function () {
    it('creates a hash with all of the actions as keys', function () {
      expect(constants).to.include.keys([
        'UPDATE',
        'DESTROY',
        'CREATE'
      ]);
    });

    it('does not include extra keys', function () {
      expect(Object.keys(constants).length).to.equal(3);
    });

    it('creates a hash where the values are the keys plux prefix', function () {
      Object.keys(constants).forEach(function (key) {
        expect(constants[key]).to.equal(`TODO_${key}`);
      });
    });
  });
});
