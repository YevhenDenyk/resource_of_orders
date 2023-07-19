import {axiosService} from './axios.service'
import {urls} from "../config";

const _accessToken = 'accessToken';
const _refreshToken = 'refreshToken';

const authService = {
    login: (loginData) => axiosService.post(urls.auth.login, loginData),
    refresh: (refreshToken) => axiosService.post(urls.auth.refresh,null ,{headers: {'refreshToken': refreshToken}}),
    logout: () => axiosService.post(urls.auth.logout),
    forgotPassword: (data) => axiosService.post(urls.auth.forgotPassword, data),
    updatePasswordAfterForgot: (password, actionToken) => axiosService.put(urls.auth.forgotPassword, {password:password},{
        headers: {'actionToken': actionToken}
    }),

    setToken: ({accessToken, refreshToken}) => {
        localStorage.setItem(_accessToken, accessToken);
        localStorage.setItem(_refreshToken, refreshToken);
    },

    deleteToken: () => {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
    },
    getAccessToken: () => localStorage.getItem(_accessToken),
    getRefreshToken: () => localStorage.getItem(_refreshToken),

}

export {authService}