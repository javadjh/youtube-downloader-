import { message } from "antd";
import axios from "axios";


axios.defaults.headers.post['Content-Type']="application/json"
axios.defaults.headers.common['token']=localStorage.getItem("token") +""



axios.interceptors.response.use(undefined,error=>{

    if(error){
        message.error("خطا رخ داد")
    }
    return Promise.reject(error)
})

export default {
    post:axios.post,
    get:axios.get,
    put:axios.put,
    delete:axios.delete
}
