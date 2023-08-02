import {axiosService} from "./axios.service";
import {urls} from "../config";

const userService = {
    getAll: (filter = {}) => axiosService.get(urls.users, {params: filter}),
    create: (newUser = {}) => axiosService.post(urls.users, newUser),
    getById: (_id) => axiosService.get(`${urls.users}/${_id}`),
    update: (_id, updateUser={})=>axiosService.put(`${urls.users}/${_id}`, updateUser),
    delete: (_id)=> axiosService.delete(`${urls.users}/${_id}`),
}

export {userService}