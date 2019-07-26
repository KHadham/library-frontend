import axios from 'axios';

let URL = 'http://localhost:5000'

export const getBuku = () => {
  return {
    type: 'GET_BOOKS',
    payload: axios.get(URL+'/buku'),
  };
};

export const postBuku = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_BOOK",
    payload: axios.post(URL+'/buku', data[0])
  };
};

export const deleteBuku = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_BOOK',
		payload: axios.delete(URL +`/book/${param}`)
	}
}