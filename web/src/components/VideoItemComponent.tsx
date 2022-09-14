import { Card, Col, Image, Typography } from "antd"
import { IVideo } from "../interfaces/video"
import { ImageStyled, VideoCardStyled } from "../styles/global.style"
interface IVideoItemComponent {
    video:IVideo;
    onVideoClick:(video:IVideo)=>void
} 
const VideoItemComponent :React.FC<IVideoItemComponent> = ({onVideoClick,video})=>{
    return (
        <Col span={6} xs={24} lg={6} sm={12}>
            <VideoCardStyled onClick={()=>{
                onVideoClick(video)
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
    )
}
export default VideoItemComponent