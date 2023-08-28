import {axiosService} from "./axios.service";
import {urls} from "../config";

const contractorService = {
    getAll: (filter = {}) => axiosService.get(urls.contractors, {params: filter}),
    create: (contractor = {}) => axiosService.post(urls.contractors, contractor),
    getById: (_id) => axiosService.get(`${urls.contractors}/${_id}`),
    update: (_id, updateContractor = {}) => axiosService.put(`${urls.contractors}/${_id}`, updateContractor),
    delete: (_id) => axiosService.delete(`${urls.contractors}/${_id}`),
}

export {contractorService}