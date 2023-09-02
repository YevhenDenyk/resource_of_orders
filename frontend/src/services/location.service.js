import {axiosService} from "./axios.service";
import {urls} from "../config";

const locationService = {
    getAbsolutelyAll: () => axiosService.get(urls.locations, {params: {limit: 1000000}})
}

export {locationService}