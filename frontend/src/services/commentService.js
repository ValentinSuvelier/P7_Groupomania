// create delete
import {instance} from "./instanceAxios";

const URL = "/api/comment/"

class commentService{
    createComment(data){
        return instance.post(URL, data)
    }
    deleteComment(id){
        return instance.delete(URL + id)
    }
}

export default new commentService()