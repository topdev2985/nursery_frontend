import axios from "axios";
import serverurl from "./serverurl";
import dayjs from "dayjs";

export function fetchInvoiceApi(data){
    const startTime=dayjs(data.startTime).format('YYYY-MM-DD');
    const endTime=dayjs(data.endTime).format('YYYY-MM-DD');
    const parentName=data.parentName;
    return new Promise((resolve, reject)=>{
        axios.get(`${serverurl}/invoiceapi/fetch`, {params:{startTime, endTime, parentName}}).then(res=>{
            resolve(res);
        })
        .catch(err=>{
            reject(err);
        })
    })
}