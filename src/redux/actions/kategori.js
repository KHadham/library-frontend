import axios from 'axios';

let URL = 'http://192.168.100.97:5000'

export const getKategory= () => {
  return {
    type: 'GET_KATEGORI',
    payload: axios.get(URL+'/kategori'),
  };
};
