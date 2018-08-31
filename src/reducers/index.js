import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import selector from './selector';
import home from './home';

export default combineReducers({
  router: routerReducer,
  selector,
  home,
});
