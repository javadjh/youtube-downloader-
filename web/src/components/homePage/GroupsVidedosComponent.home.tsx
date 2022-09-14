import { Card, Col, Pagination, Row, Typography } from "antd"
import { HomePageContext } from "../../context/home/HomePageContext"
import { SpaceStyled } from "../../styles/global.style"
import {useContext} from 'react'
import {ArrowRightOutlined} from '@ant-design/icons'
import VideoItemComponent from "../VideoItemComponent"
import { IVideo } from "../../interfaces/video"
const GroupsVideosComponent = ()=>{
    const {isShowGroupsVideo,
           setIsShowGroupsVideo,
           setGroupsVideo,
           groupsVideo,
           group,
           getGroupsVideos,
           setVideoInfo,
           setGroup} = useContext(HomePageContext)
    return (
        <>
            {isShowGroupsVideo?(
                <Card>
                    <Typography.Link style={{fontSize:20}} onClick={()=>{
                        setIsShowGroupsVideo(false)
                        setGroupsVideo({
                            pageId:1,
                            eachPerPage:12,
                            total:0,
                            videos:[],
                            groupId:undefined
                        })
                    }}>
                        <ArrowRightOutlined/>
                        <Typography.Link style={{marginRight:5}}>بازگشت</Typography.Link>
                    </Typography.Link>
                    <Row>
                        {groupsVideo.videos?.map((videoItem:IVideo)=>(
                            <VideoItemComponent video={videoItem} onVideoClick={setVideoInfo}/>
                        ))}
                    </Row>
                    <Pagination
                        current={groupsVideo.pageId}
                        defaultCurrent={groupsVideo.pageId}
                        defaultPageSize={groupsVideo.eachPerPage}
                        total={groupsVideo.total}
                        onChange={(page)=>{
                            setGroupsVideo({
                                ...groupsVideo,
                                ...{
                                    pageId:page
                                }
                            })
                        }}
                    />
                </Card>
            ):(
                <Card>
                    {group?.groups?.map((groupItem:any)=>(
                        <SpaceStyled bottom={10}>
                            <Card>
                                <Row justify="space-between">
                                    <Col>
                                        <Typography.Text strong>{groupItem.title}</Typography.Text> / تعداد ویدیو ها : {groupItem.videoCount}
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>{groupItem.createdAt}</Col>
                                            <Col>
                                                <SpaceStyled right={30}>
                                                    <Typography.Link onClick={()=>{
                                                        getGroupsVideos(groupItem._id)
                                                    }}>نمایش ویدیو ها</Typography.Link>
                                                </SpaceStyled>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </SpaceStyled>
                    ))}
                    <Pagination
                        current={group.pageId}
                        defaultCurrent={group.pageId}
                        defaultPageSize={group.eachPerPage}
                        total={group.total}
                        onChange={(page)=>{
                            setGroup({
                                ...group,
                                ...{
                                    pageId:page
                                }
                            })
                        }}
                    />
                </Card>
            )}
            
        </>
    )
}
export default GroupsVideosComponent