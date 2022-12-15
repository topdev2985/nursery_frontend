import axios from 'axios';
import serverurl from './serverurl';

export function login(name, pass, callback){
    axios.post(`${serverurl}/loginapi`, {
        password:pass,
        username:name
    }).then(res=>{
        callback(res)
    })
}

export function register(name, pass, callback){
    axios.post(`${serverurl}/registerapi`, {
        username:name,
        password:pass
    }).then(res=>{
        callback(res)
    })
}