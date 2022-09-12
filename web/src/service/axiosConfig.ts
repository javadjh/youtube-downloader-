import axios from "axios";


axios.defaults.headers.post['Content-Type']="application/json"
/*axios.defaults.headers.post['token']=getCookie("token") ? getCookie("token"): ""*/



axios.interceptors.response.use(undefined,error=>{

    if(error){
        if(error.response){
            if(error.response.data)
                if(!error.response.data.state){
                    console.log(error.response.data.error)
                    // openNotification("خطا رخ داد",error.response.data.message)
                }
        }
    }
    return Promise.reject(error)
})

export default {
    post:axios.post,
    get:axios.get,
    put:axios.put,
    delete:axios.delete
}
