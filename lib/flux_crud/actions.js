'use strict';

class Actions {
  constructor(props) {
    this._dispatcher = props.dispatcher;
    this._constants = props.constants;
  }

  create(attrs) {
    this._dispatcher.dispatch({
      actionType: this._constants.CREATE,
      attrs: attrs
    });
  }

  update(key, attrs) {
    this._dispatcher.dispatch({
      actionType: this._constants.UPDATE,
      key: key,
      attrs: attrs
    });
  }

  destroy(key) {
    this._dispatcher.dispatch({
      actionType: this._constants.DESTROY,
      key: key
    });
  }
}

module.exports = Actions;
