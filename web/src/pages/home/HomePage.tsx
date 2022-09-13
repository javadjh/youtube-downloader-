import { CenterStyled, ImageStyled, SpaceStyled, VideoCardStyled,HomePageHeader, DarkBackgroundColorStyled, CustomInput, WhiteColorStyled, BackgroundGradient } from "../../styles/global.style"
import {Button, Card, Col, Divider, Form, Image, Input, Pagination, Row, Space, Typography} from 'antd'
import { useEffect, useState } from "react"
import { getItagsVideoLinkService, getVideosService, videoInfoService } from "../../service/Video"
import { IVideo } from "../../interfaces/video"
interface IVideoResponse {
    pageId:number;
    eachPerPage:number;
    total:number;
    searchValue:string;
    videos:Array<IVideo>
}
const HomePage = ()=>{
    const [videoInfo,setVideoInfo] = useState<IVideo>()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isVideoInfoLoading,setIsVideoInfoLoading] = useState<boolean>(false)
    const [video,setVideo] = useState<IVideoResponse>({
        pageId:1,
        eachPerPage:12,
        searchValue:"",
        total:0,
        videos:[]
    })
    useEffect(()=>{
        getVideos()
    },[video.pageId])

    const getVideos = async ()=>{
        const {data,status} = await getVideosService({
            eachPerPage:video.eachPerPage,
            pageId:video.pageId,
            searchValue:video.searchValue
        })
        setVideo(data)
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
    return (
        <BackgroundGradient>
            <SpaceStyled>
                <SpaceStyled horizontal={10}>
                    <DarkBackgroundColorStyled>
                        <div style={{width:"100%"}}>
                            
                            <Form >
                                <CenterStyled>
                                    <h1 style={{color:"white"}}>دانلودر یوتیوب</h1>
                                    <WhiteColorStyled>به راحتی هرچی میخای از یوتیوب دانلود ! لینکشو پایین بزار بقیش با من</WhiteColorStyled>
                                    <div style={{width:"50%"}}>
                                        <label>لینک</label>
                                        <Row>
                                            <Col span={24}>
                                                <Form.Item name={"url"}>
                                                    <CustomInput.Search 
                                                        loading={isVideoInfoLoading}
                                                    size="large" enterButton allowClear onSearch={(url)=>{
                                                        getVideoInfo(url)
                                                    }} placeholder="لینک فیلم یوتیوب را وارد کنید..." style={{width:"100%"}}/>
                                                </Form.Item>
                                            </Col>
                                            {/* <Col span={4}>
                                                <SpaceStyled right={10}>
                                                    <Button block htmlType="submit" type="primary">ثبت</Button>
                                                </SpaceStyled>
                                            </Col> */}
                                        </Row>
                                    </div>
                                </CenterStyled>
                            </Form>
                        </div>
                    </DarkBackgroundColorStyled>
                </SpaceStyled>

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
                                                    <Typography.Text>{videoInfo.category}</Typography.Text>
                                                </SpaceStyled>
                                            </Col>
                                            <Col>
                                                <SpaceStyled left={30}>
                                                    <Typography.Text>{videoInfo.videoLength} دقیقه</Typography.Text>
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
                                            <Row>
                                                <Col>
                                                    <Button onClick={()=>{
                                                        getFileLink(false)
                                                    }} type="primary" loading={isLoading}>دانلود از سرور ما</Button>
                                                </Col>
                                                <Col>
                                                    <SpaceStyled right={10}>
                                                        <a target={"_blank"} href={videoInfo.profile}>
                                                            <Button type="primary">پروفایل</Button>
                                                        </a>
                                                    </SpaceStyled>

                                                </Col>
                                                <Col>
                                                    <SpaceStyled right={10}>
                                                        <a target={"_blank"} href={videoInfo.url}>
                                                            <Button type="primary">صفحه ویدیو</Button>
                                                        </a>
                                                    </SpaceStyled>

                                                </Col>
                                            </Row>
                                        </SpaceStyled>
                                        
                                    </SpaceStyled>
                                </Col>
                            </Row>
                        </Card>
                    </SpaceStyled>
                )}
                <SpaceStyled vertical={20} horizontal={10}>
                <Card>
                    
                        <Form>
                            <SpaceStyled horizontal={10} top={20}>
                                <Row>
                                    <Col span={21}>
                                        <Form.Item>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <SpaceStyled right={20}>
                                            <Button block>جستجو</Button>
                                        </SpaceStyled>
                                    </Col>
                                </Row>
                            </SpaceStyled>
                        </Form>
                        <Row>
                            {video?.videos?.map(video=>(
                                <Col span={6} xs={24} lg={6} sm={12}>
                                    <VideoCardStyled onClick={()=>{
                                        setVideoInfo(video)
                                    }}>
                                        <Card>
                                            <Image preview={false} style={ImageStyled} src={video.image} width={"100%"}/>
                                            <br/>
                                            <Typography.Text strong ellipsis>{video.title}</Typography.Text>
                                            <br/>
                                            <Typography.Text>مدت : {video.videoLength}</Typography.Text>
                                            <br/>
                                            <Typography.Text>بازدید : {video.viewCount}</Typography.Text>
                                        </Card>
                                        
                                    </VideoCardStyled>
                                </Col>
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
                    </SpaceStyled>
            </SpaceStyled>
                
        </BackgroundGradient>
        
    )
}
export default HomePage