import {axiosService} from "./axios.service";
import {urls} from "../config";

const commentService = {
    createComment: (comment)=>axiosService.post(urls.comments, comment)
}

export {commentService}