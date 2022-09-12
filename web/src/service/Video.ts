import { getItagsVideoLinkAPI, videoInfoAPI } from "./APIRoutes"
import axiosConfig from "./axiosConfig"

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
