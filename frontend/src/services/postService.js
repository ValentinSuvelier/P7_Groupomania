import {instance} from "./instanceAxios";

const URL = "/api/post/"

class postService{
    post(data){
        return instance.post(URL, data)
    }
    getAllPost(){
        return instance.get(URL)
    }
    deletePost(id){
        return instance.delete(URL + id)
    }
}

export default new postService()