import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

instance.interceptors.request.use(async config => {
    const token = JSON.parse(localStorage.getItem("token"))
    if(token){
        config.headers.Authorization = token
    }
    return config
})

export {instance}