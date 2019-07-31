import axios from 'axios';

let URL = 'http://192.168.100.97:5000'

export const getUser = () => {
  return {
    type: 'GET_USERS',
    payload: axios.get(URL+'/users'),
  };
};
/////////////////////////////////////////////
export const postUser = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_USERS",
    payload: axios.post(URL+'/users', data[0])
  };
};
/////////////////////////////////////////////
export const deleteUser = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_USERS',
		payload: axios.delete(URL +`/users/${param}`)
	}
}
/////////////////////////////////////////////
export const getUser1 = (param1) => {
  console.log("book id: " + param1)
  return {
      type: 'GET_USER1',
      payload: axios.get(URL +`/users/${param1}`)
  }
}
/////////////////////////////////////////////
export const updateUser = (bookid, data) => {
  //console.log("book id: " + bookid)
  return {
      type: 'UPDATE_USERS',
      payload: axios.patch(URL +`/users/${bookid}`, data)
  }
}
