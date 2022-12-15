import axios from "axios";
import serverurl from "./serverurl";

export function saveRegisterValuesApi(selChildren, values, callback){
    axios.post(`${serverurl}/attendanceapi/insert`, {selChildren:selChildren, values:values}).then(callback);
}

export function fetchAttendantChildrenApi(today){
    return new Promise((resolve, reject)=>{
        axios.get(`${serverurl}/attendanceapi/listtoday`, {params:{today:today}}).then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        })
    })   
};

export function fetchAttendantChildActivityApi(today, childId){
    return new Promise((resolve, reject)=>{
        axios.get(`${serverurl}/attendanceapi/todaychildactivity`, {params:{today:today, childId:childId}}).then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        })
    })
};

export function updateChildActivityTime(childId, type, activityId, time, callback){
    axios.post(
        `${serverurl}/attendanceapi/updateactivitytime`,
        {
            childId,
            type,
            activityId,
            time
        }
    ).then(res=>{
        callback();
    })
}

export function updateAttendantChildActivityApi(attId, registerValues, callback){
    axios.post(
        `${serverurl}/attendanceapi/updateactivity`,
        {
            attId,
            registerValues
        }
    ).then(res=>{
        callback();
    })
}