import { Button, Card, Col, Image, Row, Typography } from "antd"
import Paragraph from "antd/lib/skeleton/Paragraph"
import {useContext} from 'react'
import { HomePageContext } from "../../context/home/HomePageContext"
import { SpaceStyled } from "../../styles/global.style"

const VideoComponent = ()=>{
    const {videoInfo,isLoading,getFileLink} = useContext(HomePageContext)
    return (
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
                                    <Col>
                                        <SpaceStyled right={10}>
                                            {videoInfo?.files[0]?.file && (
                                                <SpaceStyled top={5}>
                                                    <Typography.Link ellipsis={true} style={{width:230}} copyable={{ text: videoInfo?.files[0]?.file }}>{videoInfo?.files[0]?.file}</Typography.Link>
                                                </SpaceStyled>
                                            )}
                                        </SpaceStyled>
                                    </Col>
                                </Row>
                            </SpaceStyled>
                            
                        </SpaceStyled>
                    </Col>
                </Row>
            </Card>
        </SpaceStyled>
    )
}
export default VideoComponent