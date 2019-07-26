import axios from 'axios';

let URL = 'http://localhost:5000'

export const getKategory= () => {
  return {
    type: 'GET_KATEGORI',
    payload: axios.get(URL+'/kategori'),
  };
};
