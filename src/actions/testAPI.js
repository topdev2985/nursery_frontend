import axios from 'axios';
import serverurl from './serverurl';
export function fectchTest(){
    return new Promise((resolve, reject)=>{
        axios.get(`${serverurl}/test`).then(res=>{
            console.log(res);
            resolve(res);
        })
        .catch(err=>{
            console.log(err);
            reject(err);
        })
    })
}