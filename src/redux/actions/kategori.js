import axios from 'axios';

let URL = 'http://192.168.6.168:5000'

export const getKategory= () => {
  return {
    type: 'GET_KATEGORI',
    payload: axios.get(URL+'/kategori'),
  };
};
