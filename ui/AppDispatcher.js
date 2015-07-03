import { Dispatcher } from 'flux';

var AppDispatcher = Object.assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch(action);
  }
});

module.exports = AppDispatcher;
