import {instance} from "./instanceAxios";

const URL = "/api/auth/"

class userService{
    login(data){
        return instance.post(URL + "login", data)
    }
    signup(data){
        return instance.post(URL + "signup", data)
    }
    getAllUser(){
        return instance.get(URL)
    }
    deleteUserById(id){
        return instance.delete(URL + id)
    }
    logout() {
        localStorage.clear()
    }
}

export default new userService()