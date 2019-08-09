import axios from "axios";
import { AsyncStorage } from "react-native";
import Url from "../../../support/url";

export const userLogin = (data) => {
    console.log(`yang login yaaa`, data)
    return{
        type:"LOGIN_USER",
        payload: axios.post(Url + `user/login`, data, {
            headers:{
                'authorization': 'x-app',
                'x-token': 'token',
                'x-user': '1'
              }
        }).then(res => {
            console.log(`Dicoba yang di Login`, res)
            const token = res.data.token
            const id_user = res.data.id_user.toString()
            const nama_user = res.data.nama_user
            const status = res.data.status
            const email = res.data.email
            AsyncStorage.setItem('token', token)
            AsyncStorage.setItem('id_user', id_user)
            AsyncStorage.setItem('nama_user', nama_user)
            AsyncStorage.setItem('status', status)
            AsyncStorage.setItem('email', email)
        }),
        // headers:{
        //     "Content-Type": "application/json",
        //     Accept: "application/json"
        // }
    }
}