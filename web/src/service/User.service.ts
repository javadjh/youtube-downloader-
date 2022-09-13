import { loginAPI, videoInfoAPI } from "./APIRoutes"
import axiosConfig from "./axiosConfig"

export interface ILoginReq {
    userName:string;
    password:string
}

//لاگین
export const loginService=(data:ILoginReq)=>{
    return axiosConfig.post(`${loginAPI}`,data)
}