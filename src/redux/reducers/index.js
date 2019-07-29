import {combineReducers} from 'redux';

import reUser from './user';
import reBuku from './book';
import reHistory from './history';
import reKategori from './kategori';

const appReducer = combineReducers({
  reUser,
  reBuku,
  reHistory,
  reKategori
});

export default appReducer;
