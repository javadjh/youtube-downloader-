import { HomePageContext } from "./HomePageContext"
import {useState,useEffect} from 'react'
import { IHomePageContext } from "./HomePageContextInterface"
import { IVideo } from "../../interfaces/video"
import { groupsService, groupsVideosService } from "../../service/Group.service"
import { getItagsVideoLinkService, getVideosService, videoInfoService } from "../../service/Video"
interface IHomePageContextProvider {
    children:any
}
export interface IVideoResponse {
    pageId?:number;
    eachPerPage?:number;
    total?:number;
    searchValue?:string;
    videos?:Array<IVideo>
    //for group
    groupId?:string
}
export interface IGroupResponse {
    pageId:number;
    eachPerPage:number;
    total:number;
    searchValue:string;
    groups:Array<any>
}
const HomePageContextProvider:React.FC<IHomePageContextProvider> = ({children})=>{
    const [videoInfo,setVideoInfo] = useState<IVideo>()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isVideoInfoLoading,setIsVideoInfoLoading] = useState<boolean>(false)
    const [isShowGroupsVideo,setIsShowGroupsVideo] = useState<boolean>(false)
    const [video,setVideo] = useState<IVideoResponse>({
        pageId:1,
        eachPerPage:12,
        searchValue:"",
        total:0,
        videos:[]
    })

    const [groupsVideo,setGroupsVideo] = useState<IVideoResponse>({
        pageId:1,
        eachPerPage:12,
        total:0,
        videos:[],
        groupId:undefined
    })
    const [group,setGroup] = useState<IGroupResponse>({
        pageId:1,
        eachPerPage:12,
        searchValue:"",
        total:0,
        groups:[]
    })
    useEffect(()=>{
        getVideos()
    },[video.pageId])
    useEffect(()=>{
        getGroups()
    },[group.pageId])
    useEffect(()=>{       
        if(groupsVideo.groupId){
            console.log("sdcsdcsdcsdc");
            getGroupsVideos(groupsVideo.groupId)

        }
    },[groupsVideo.pageId])

    const getGroupsVideos = async (id:string)=>{
        const {data} = await groupsVideosService({
            eachPerPage:groupsVideo.eachPerPage,
            pageId:groupsVideo.pageId,
            searchValue:groupsVideo.searchValue,
            groupId:id
        })
        setGroupsVideo(data)
        setIsShowGroupsVideo(true)
    }

    const getVideos = async ()=>{
        const {data} = await getVideosService({
            eachPerPage:video.eachPerPage,
            pageId:video.pageId,
            searchValue:video.searchValue
        })
        setVideo(data)
    }
    const getGroups = async ()=>{
        const {data} = await groupsService({
            eachPerPage:group.eachPerPage,
            pageId:group.pageId,
            searchValue:group.searchValue
        })
        setGroup(data)
    }

    const getVideoInfo = async (url:string)=>{
        setIsVideoInfoLoading(true)
        const {data} = await videoInfoService(url)
        setVideoInfo(data)
        getVideos()
        setIsVideoInfoLoading(false)
    }

    const getFileLink = async (isNative:boolean)=>{
        setIsLoading(true)
        if(isNative){
            createDownload(videoInfo?.formats[0].url)
            return
        }
        
        if(videoInfo?._id){
            if(videoInfo?.files?.length>0){
                createDownload(videoInfo?.files[0].file?.toString())
                return
            }
            const {data} = await getItagsVideoLinkService({
                itag:videoInfo?.formats[0]?.itag?.toString(),
                videoId:videoInfo._id
            })
            createDownload(data)
        }
    }
    const createDownload = (url:any)=>{
        setIsLoading(false)
        const link = document.createElement('a');
        link.href = url;
        link.target = "_blank"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    }
    const value :IHomePageContext= {
        videoInfo,setVideoInfo,
        isLoading,setIsLoading,
        isVideoInfoLoading,setIsVideoInfoLoading,
        isShowGroupsVideo,setIsShowGroupsVideo,
        video,setVideo,
        groupsVideo,setGroupsVideo,
        group,setGroup,
        getGroupsVideos,
        getVideos,
        getGroups,
        getVideoInfo,
        getFileLink,
        createDownload
    }
    return (
        <HomePageContext.Provider value={value}>
            {children}
        </HomePageContext.Provider>
    )
}
export default HomePageContextProvider