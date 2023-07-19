import axios from "axios";
import {createBrowserHistory} from "history";

import {baseURL} from "../config"
import {authService} from "./auth.service";

const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

let isRefreshing = false;

axiosService.interceptors.request.use((config) => {
    const accessToken = authService.getAccessToken()

    if (accessToken) {
        config.headers.Authorization = accessToken
    }

    return config
})

axiosService.interceptors.response.use((config) => {
        return config;
    },
    async (error) => {
        const refreshToken = authService.getRefreshToken();

        if (error.response?.status === 401 && refreshToken && !isRefreshing) {
            isRefreshing = true
            try {
                const {data} = await authService.refresh(refreshToken);
                authService.setToken(data)
            } catch (e) {
                authService.deleteToken()
                history.replace('/login?expSession=true')
            }
            return Promise.reject(error)
        }
    }
)

export {axiosService, history}