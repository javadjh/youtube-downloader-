import {useContext} from 'react'
import { Card, Pagination, Row } from "antd"
import VideoItemComponent from "../VideoItemComponent"
import { HomePageContext } from '../../context/home/HomePageContext'
import { IVideo } from '../../interfaces/video'

const VideosComponent = ()=>{
    const {video,setVideoInfo,setVideo} = useContext(HomePageContext)
    return(
        <Card>
            <Row>
                {video?.videos?.map((videoItem:IVideo)=>(
                    <VideoItemComponent onVideoClick={setVideoInfo} video={videoItem}/>
                ))}
            </Row>
            <Pagination
                current={video.pageId}
                defaultCurrent={video.pageId}
                defaultPageSize={video.eachPerPage}
                total={video.total}
                onChange={(page)=>{
                    setVideo({
                        ...video,
                        ...{
                            pageId:page
                        }
                    })
                }}
            />
        </Card>
    )
}
export default VideosComponent