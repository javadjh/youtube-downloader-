import { CenterStyled, CenterVerticalStyled, DarkBackgroundColorStyled, DynamicWidthStyled, FormatStyled, SpaceStyled } from "../../styles/global.style"
import {Button, Card, Col, Divider, Form, Image, Input, Row, Space, Typography} from 'antd'
import { useState } from "react"
import { getItagsVideoLinkService, videoInfoService } from "../../service/Video"
import { IVideo, videoFormat } from "../../interfaces/video"

const HomePage = ()=>{
    const [videoInfo,setVideoInfo] = useState<IVideo>()
    const getVideoInfo = async (dataForm:any)=>{
        const {data} = await videoInfoService(dataForm.url)
        setVideoInfo(data)
    }

    const getFileLink = async ()=>{
        console.log(videoInfo);
        
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
        const link = document.createElement('a');
        link.href = url;
        link.target = "_blank"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <SpaceStyled top={20}>
            <a target={"_blank"}></a>
            <Form onFinish={getVideoInfo}>
                <CenterStyled>
                    <Card style={{width:"50%"}}>
                        <label>لینک</label>
                        <Form.Item name={"url"}>
                            <Input placeholder="لینک فیلم یوتیوب را وارد کنید..." style={{width:"100%"}}/>
                        </Form.Item>
                        <Button htmlType="submit" type="primary">ثبت</Button>
                    </Card>
                </CenterStyled>
            </Form>

            {videoInfo && (
                <SpaceStyled top={20} horizontal={20}>
                    <Card>
                        <Row>
                            <Col span={7}>
                                <Image preview={false} src={videoInfo.image}/>
                            </Col>
                            <Col span={17}>
                                <SpaceStyled horizontal={20}>
                                    <Typography.Text strong>{videoInfo.title}</Typography.Text>
                                    <br/>
                                    <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>{videoInfo.description}</Typography.Paragraph>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <SpaceStyled left={30}>
                                                <Typography.Text>{videoInfo.videoLength} ثانیه</Typography.Text>
                                            </SpaceStyled>
                                        </Col>
                                        <Col>
                                            <SpaceStyled left={30}>
                                                <Typography.Text>انتشار : {videoInfo.publishDate}</Typography.Text>
                                            </SpaceStyled>
                                        </Col>
                                        <Col>
                                            <SpaceStyled left={30}>
                                                <Typography.Text>بازدید : {videoInfo.viewCount}</Typography.Text>
                                            </SpaceStyled>
                                        </Col>
                                    </Row>
                                    <SpaceStyled top={30}>
                                        <Button onClick={()=>{
                                            getFileLink()
                                        }} type="primary" >دانلود</Button>
                                    </SpaceStyled>
                                    
                                </SpaceStyled>
                            </Col>
                        </Row>
                    </Card>
                </SpaceStyled>
            )}
            
        </SpaceStyled>
    
    )
}
export default HomePage