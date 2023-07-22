import {axiosService} from "./axios.service";
import {urls} from "../config";

const orderService = {
    getAll: (filter = {}) => axiosService.get(urls.orders, {params: filter})
}

export {orderService}