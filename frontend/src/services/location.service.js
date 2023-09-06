import {axiosService} from "./axios.service";
import {urls} from "../config";

const locationService = {
    getAbsolutelyAll: () => axiosService.get(urls.locations, {params: {limit: 1000000}}),
    getAll: (filter = {}) => axiosService.get(urls.locations, {params: filter}),
    create: (location = {}) => axiosService.post(urls.locations, location),
    getById: (_id) => axiosService.get(`${urls.locations}/${_id}`),
    update: (_id, updateLocation = {}) => axiosService.put(`${urls.locations}/${_id}`, updateLocation),
    delete: (_id) => axiosService.delete(`${urls.locations}/${_id}`),
}

export {locationService}