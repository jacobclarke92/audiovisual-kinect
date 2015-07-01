import { Dispatcher } from 'flux';
import assign from 'object-assign';

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch(action);
  }
});

module.exports = AppDispatcher;
