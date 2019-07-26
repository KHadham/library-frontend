import {combineReducers} from 'redux';

import user from './user';
import buku from './book';
import history from './history';
import kategori from './kategori';

const appReducer = combineReducers({
  user,
  buku,
  history,
  kategori
});

export default appReducer;
