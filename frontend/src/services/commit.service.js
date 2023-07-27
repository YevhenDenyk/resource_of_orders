import {axiosService} from "./axios.service";
import {urls} from "../config";

const commitService = {
    createCommit: (commit)=>axiosService.post(urls.commit, commit)
}

export {commitService}