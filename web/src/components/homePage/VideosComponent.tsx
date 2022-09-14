import {useContext} from 'react'
import { Button, Card, Col, Form, Input, Pagination, Row, Space } from "antd"
import VideoItemComponent from "../VideoItemComponent"
import { HomePageContext } from '../../context/home/HomePageContext'
import { IVideo } from '../../interfaces/video'
import { SpaceStyled } from '../../styles/global.style'

const VideosComponent = ()=>{
    const {video,setVideoInfo,setVideo} = useContext(HomePageContext)
    return(
        <Card>
            <SpaceStyled horizontal={10}>
                <Form
                    onFinish={(formData)=>{
                        setVideo({...video,...{searchValue:formData.searchValue,pageId:1}})
                    }}
                >
                    <Row>
                        <Col span={20}>
                            <Form.Item name={"searchValue"}>
                                <Input placeholder="جستجو در ویدیو ها..."/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <SpaceStyled right={20}>
                                <Button htmlType='submit' block>جستجو</Button>
                            </SpaceStyled>
                        </Col>
                    </Row>
                </Form>
            </SpaceStyled>
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