import { Button, Form } from "antd"
import { CenterStyled, CustomInput, DarkBackgroundColorStyled, WhiteColorStyled } from "../../styles/global.style"
import UploaderComponent from "../UploaderComponent"
import {useContext} from 'react'
import { HomePageContext } from "../../context/home/HomePageContext"
import {CloudUploadOutlined} from '@ant-design/icons'

const HeaderComponent = ()=>{
    const {isVideoInfoLoading,getVideoInfo,isLoading,setIsLoading} = useContext(HomePageContext)
    return (
        <DarkBackgroundColorStyled>
            <div style={{width:"100%"}}>
                
                <Form >
                    <CenterStyled>
                        <h1 style={{color:"white"}}>دانلودر یوتیوب</h1>
                        <WhiteColorStyled>به راحتی هرچی میخای از یوتیوب دانلود ! لینکشو پایین بزار بقیش با من</WhiteColorStyled>
                        <div style={{width:"50%"}}>
                            <Form.Item name={"url"}>
                                <CustomInput.Search 
                                    loading={isVideoInfoLoading}
                                size="large" enterButton allowClear onSearch={getVideoInfo} placeholder="لینک فیلم یوتیوب را وارد کنید..." style={{width:"100%"}}/>
                            </Form.Item>
                            <CenterStyled>
                                <UploaderComponent onUploaded={()=> setIsLoading(false) }>
                                    <Button
                                        type="primary"
                                        icon={<CloudUploadOutlined style={{fontSize:16}}/>}
                                        loading={isLoading}
                                        onClick={() => setIsLoading(true)}
                                        >
                                        بارگذاری فایل متنی
                                    </Button>
                                </UploaderComponent>
                            </CenterStyled>
                        </div>
                    </CenterStyled>
                </Form>
            </div>
        </DarkBackgroundColorStyled>
    )
}
export default HeaderComponent