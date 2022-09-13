import { getItagsVideoLinkAPI, getVideosAPI, videoInfoAPI } from "./APIRoutes"
import axiosConfig from "./axiosConfig"
export interface IPaging {
    pageId?:number;
    eachPerPage?:number;
    searchValue?:string;
}
export interface IGetItagsVideoLinkReq {
    itag:string,
    videoId:string
}

//دریافت اطلاعات لینک یوتیوب
export const videoInfoService=(url:string)=>{
    return axiosConfig.post(`${videoInfoAPI}`,{url})
}

//دریافت لینک ویدیو از طریق itag & videoId
export const getItagsVideoLinkService=(data:IGetItagsVideoLinkReq)=>{
    return axiosConfig.get(`${getItagsVideoLinkAPI}${data.videoId}/${data.itag}`)
}

//دریافت فهرست ویدیوها
export const getVideosService=(filter:IPaging)=>{
    return axiosConfig.get(`${getVideosAPI}`,{
        params:filter
    })
}
