import {axiosService} from "./axios.service";
import {urls} from "../config";

const jobTypeService = {
    getAll: () => axiosService.get(urls.jobTypes),
    create: (jobType = {}) => axiosService.post(urls.jobTypes, jobType),
    getById: (_id_Location) => axiosService.get(`${urls.jobTypes}/${_id_Location}`),
    update: (_id_Location, updateJobType = {}) => axiosService.put(`${urls.jobTypes}/${_id_Location}`, updateJobType),
}

export {jobTypeService}