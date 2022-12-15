import axios from "axios";
import serverurl from './serverurl';;

export function profileUpload(formData, callback) {
    axios.post(`${serverurl}/childrenapi/profile`, formData).then(callback);
}

export function insertNewChild(child, callback) {
    axios.post(`${serverurl}/childrenapi/insert`, child).then(callback);
}

export function fetchChilrenApi() {
    return new Promise((resolve, reject) => {
        axios.get(`${serverurl}/childrenapi/list`).then(res => {
            // console.log(res);
            resolve(res);
        })
            .catch(err => {
                // console.log(err);
                reject(err);
            })
    })
}

export function deleteChildApi(childId, callback) {
    axios.get(`${serverurl}/childrenapi/delete`, { params: { childId: childId } }).then(callback);
}

export function editChildApi(childId, child, callback) {
    const childData={
        id:childId,
        data:child
    };
    axios.post(`${serverurl}/childrenapi/edit`, childData).then(callback);
}