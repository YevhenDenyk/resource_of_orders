import {axiosService} from "./axios.service";
import {urls} from "../config";

const orderService = {
    getAll: (filter = {}) => axiosService.get(urls.orders, {params: filter}),
    getById: (_id) => axiosService.get(`${urls.orders}/${_id}`)
}

export {orderService}