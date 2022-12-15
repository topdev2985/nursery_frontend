import axios from "axios";
import serverurl from "./serverurl";

export function fetchSearchApi(date, childId){
    return new Promise((resolve, reject)=>{
        axios.get(`${serverurl}/searchapi/fetch`, {params:{date, childId}}).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
    
}