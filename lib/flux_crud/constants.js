'use strict';

var ACTIONS = ['create', 'destroy', 'update'];

class Constants {
  constructor(props) {
    var prefix = props.prefix;

    ACTIONS.forEach((action) => {
      var constant = (prefix + '_' + action).toUpperCase();
      this[action.toUpperCase()] = constant;
    });
  }
}

module.exports = Constants;
