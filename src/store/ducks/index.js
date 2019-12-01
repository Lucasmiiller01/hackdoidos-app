import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import profileReducer from './profile';
import authReducer from './auth';
import mainReducer from './main';

import snackReducer from './snackbar';

import reportsReducer from './reports';

import {createNavigationReducer} from 'react-navigation-redux-helpers';
import routes from '../../routes';
const navReducer = createNavigationReducer(routes);

const reducers = combineReducers({
  // Remova essa linha depois de adicionar seus ducks
  form: formReducer,
  nav: navReducer,
  profile: profileReducer,
  auth: authReducer,
  snackbar: snackReducer,
  main: mainReducer,
  reports: reportsReducer,
});

export default reducers;
