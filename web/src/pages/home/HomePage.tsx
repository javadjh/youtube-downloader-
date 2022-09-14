import { CenterStyled, ImageStyled, SpaceStyled, VideoCardStyled,HomePageHeader, DarkBackgroundColorStyled, CustomInput, WhiteColorStyled, BackgroundGradient } from "../../styles/global.style"
import {Button, Card, Col, Divider, Form, Image, Input, Pagination, Row, Space, Tabs, Typography} from 'antd'
import { useContext } from "react"
import { getItagsVideoLinkService, getVideosService, videoInfoService } from "../../service/Video"
import { IVideo } from "../../interfaces/video"
import VideoItemComponent from "../../components/VideoItemComponent"
import { groupsService, groupsVideosService } from "../../service/Group.service"
import UploaderComponent from "../../components/UploaderComponent"
import {CloudUploadOutlined,ArrowRightOutlined} from '@ant-design/icons'
import HeaderComponent from "../../components/homePage/HeaderComponent.home"
import { HomePageContext } from "../../context/home/HomePageContext"
import VideoComponent from "../../components/homePage/VideoComponent"
import VideosComponent from "../../components/homePage/VideosComponent"
import GroupsVideosComponent from "../../components/homePage/GroupsVidedosComponent.home"

const HomePage = ()=>{
    const {videoInfo} = useContext(HomePageContext)
    return (
        <BackgroundGradient>
            <SpaceStyled>
                <SpaceStyled horizontal={10}>
                    <HeaderComponent/>
                </SpaceStyled>

                {videoInfo && (
                    <VideoComponent/>
                )}
                <SpaceStyled vertical={20} horizontal={10}>
                    <Card>
                        <Tabs type="card">
                            <Tabs.TabPane key={"videos"} tabKey="ویدیو ها" tab="ویدیو ها">
                                <VideosComponent/>
                            </Tabs.TabPane>
                            <Tabs.TabPane key={"group"} tabKey="گروه ها" tab="گروه ها">
                                <GroupsVideosComponent/>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </SpaceStyled>
            </SpaceStyled>
                
        </BackgroundGradient>
        
    )
}
export default HomePage