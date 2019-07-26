import axios from 'axios';

let URL = 'http://localhost:5000'

export const getUser = () => {
  return {
    type: 'GET_USERS',
    payload: axios.get(URL+'/users'),
  };
};

export const postUser = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_USERS",
    payload: axios.post(URL+'/users', data[0])
  };
};

export const deleteUser = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_USERS',
		payload: axios.delete(URL +`/users/${param}`)
	}
}
