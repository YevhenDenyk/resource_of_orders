import {axiosService} from "./axios.service";
import {urls} from "../config";

const orderService = {
    getAll: (filter = {}) => axiosService.get(urls.orders, {params: filter}),
    create: (order = {}) => axiosService.post(urls.orders, order),
    getById: (_id) => axiosService.get(`${urls.orders}/${_id}`),
    update: (_id, upOrder = {}) => axiosService.put(`${urls.orders}/${_id}`, upOrder),
    addImage: (_id, image) => axiosService.post(`${urls.orders}/${_id}/files`, image)
}

export {orderService}