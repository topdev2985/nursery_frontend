import axios from "axios";
import serverurl from "./serverurl";

export function insertNewServiceApi(service, callback) {

    axios.post(`${serverurl}/serviceapi/insert`, service)
        .then(res => {
            callback(res);

        })
        .catch(err => {
            callback(err);
        });

}

export function fetchServiceApi(){
    return new Promise((resolve, reject)=>{
        axios.get(`${serverurl}/serviceapi/list`)
            .then(res=>{
               resolve(res);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export function deleteServiceApi(id, callback){
    axios.get(`${serverurl}/serviceapi/delete`, {params:{serviceId:id}}).then(callback);
}

export default {
    insertNewServiceApi
}