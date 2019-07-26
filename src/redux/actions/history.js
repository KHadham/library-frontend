import axios from 'axios';

let URL = 'http://localhost:5000'

export const getHist = () => {
  return {
    type: 'GET_HISTORY',
    payload: axios.get(URL+'/history'),
  };
};
export const postHist = (data) => {
  //console.log('ini dari aksi',data[0]);
  return {
    type: "POST_HISTORY",
    payload: axios.post(URL+'/history', data[0])
  };
};

export const deleteHist = (param) =>{
  //console.log('action id', param)
	return{
		type: 'DELETE_HISTORY',
		payload: axios.delete(URL +`/history/${param}`)
	}
}
