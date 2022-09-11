import { CenterStyled, CenterVerticalStyled, DarkBackgroundColorStyled, DynamicWidthStyled, SpaceStyled } from "../../styles/global.style"
import {Button, Card, Form, Input, Space} from 'antd'
const HomePage = ()=>{
    return (
        <SpaceStyled top={20}>
            <Form>
                <CenterStyled>
                    <Card style={{width:"50%"}}>
                        <label>لینک</label>
                        <Form.Item name={"url"}>
                            <Input placeholder="لینک فیلم یوتیوب را وارد کنید..." style={{width:"100%"}}/>
                        </Form.Item>
                        <Button type="primary">ثبت</Button>
                    </Card>
                </CenterStyled>
            </Form>
            
        </SpaceStyled>
    
    )
}
export default HomePage