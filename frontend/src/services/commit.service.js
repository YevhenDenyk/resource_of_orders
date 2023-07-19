import {axiosService} from "./axios.service";
import {urls} from "../config";

const commitService = {
    commit: (commit)=>axiosService.post(urls.commit, commit)
}

export {commitService}