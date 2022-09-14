import { IGroupResponse, IVideoResponse } from "./HomePageContextProvider";

export interface IHomePageContext{
    videoInfo?:any;
    setVideoInfo?:any;
    isLoading?:any;
    setIsLoading?:any
    isVideoInfoLoading?:any
    setIsVideoInfoLoading?:any;
    isShowGroupsVideo?:any;
    setIsShowGroupsVideo?:any;
    video?:any;
    setVideo?:any;
    groupsVideo?:any;
    setGroupsVideo?:any;
    group?:any;
    setGroup?:any;
    getGroupsVideos?:any;
    getVideos?:any;
    getGroups?:any;
    getVideoInfo?:any;
    getFileLink?:any;
    createDownload?:any;
}