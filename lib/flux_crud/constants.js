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
