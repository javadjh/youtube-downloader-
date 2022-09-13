import { Button, Card, Col, Form, Input, Row } from "antd"
import { ILoginReq, loginService } from "../../service/User.service"
import { FullSizeStyled, SpaceStyled } from "../../styles/global.style"
import {useNavigate} from 'react-router-dom'
const LoginPage = ()=>{
    const navigate = useNavigate()
    const loginHandler = async (formData:ILoginReq)=>{
        const {data} = await loginService(formData)
        localStorage.setItem("token",data)
        navigate("/")
    }
    return (
        <>
            <SpaceStyled top={50}>
                <Form onFinish={loginHandler}>
                    <Row align="middle" justify="center">
                        <Col span={12}>
                            <FullSizeStyled>
                                <Card>
                                    <label>نام کاربری</label>
                                    <Form.Item name={"userName"}>
                                        <Input placeholder="نام کاربری را وارد کنید..."/>
                                    </Form.Item>

                                    <label>رمز عبور</label>
                                    <Form.Item name={"password"}>
                                        <Input.Password placeholder="رمز عبور را وارد کنید..."/>
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit">ورود</Button>
                                </Card>
                            </FullSizeStyled>
                        </Col>
                    </Row>
                </Form>
            </SpaceStyled>
        </>
    )
}
export default LoginPage