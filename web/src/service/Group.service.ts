import { groupsAPI, groupsVideosAPI, loginAPI } from "./APIRoutes"
import axiosConfig from "./axiosConfig"
import { IPaging } from "./Video"
export interface IGroupsVideosReq extends IPaging{
    groupId:string
}

//دریافت گروه ویدیو ها
export const groupsService=(filter:IPaging)=>{
    return axiosConfig.get(`${groupsAPI}`,{
        params:filter
    })
}

//دریافت ویدیو های یک گروه
export const groupsVideosService=(filter:IGroupsVideosReq)=>{
    return axiosConfig.get(`${groupsVideosAPI}`,{
        params:filter
    })
}