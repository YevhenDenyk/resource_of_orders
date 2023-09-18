import {axiosService} from './axios.service'
import {urls} from "../config";

const _accessToken = 'accessToken';
const _refreshToken = 'refreshToken';
const _essenceId = 'essenceId';
const _essenceName = 'essenceName';
const _essenceEmail = 'essenceEmail';
const _accessLevel = 'accessLevel';

const authService = {
    login: (loginData) => axiosService.post(urls.auth.login, loginData),
    refresh: (refreshToken) => axiosService.post(urls.auth.refresh, null, {headers: {'refreshToken': refreshToken}}),
    logout: () => axiosService.post(urls.auth.logout),
    forgotPassword: (data) => axiosService.post(urls.auth.forgotPassword, data),
    updatePasswordAfterForgot: (password, actionToken) => axiosService.put(urls.auth.forgotPassword, {password: password}, {
        headers: {'actionToken': actionToken}
    }),

    setToken: ({accessToken, refreshToken, essenceId, essenceName, accessLevel, essenceEmail}) => {
        if (accessToken) localStorage.setItem(_accessToken, accessToken);
        if(refreshToken) localStorage.setItem(_refreshToken, refreshToken);
        if(essenceId) localStorage.setItem(_essenceId, essenceId);
        if(essenceName) localStorage.setItem(_essenceName, essenceName);
        if(essenceEmail) localStorage.setItem(_essenceEmail, essenceEmail);
        if(accessLevel) localStorage.setItem(_accessLevel, accessLevel);
    },

    deleteToken: () => {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
        localStorage.removeItem(_essenceId);
        localStorage.removeItem(_essenceName);
        localStorage.removeItem(_essenceEmail);
        localStorage.removeItem(_accessLevel);
    },

    getAccessToken: () => localStorage.getItem(_accessToken),
    getRefreshToken: () => localStorage.getItem(_refreshToken),
    getEssenceId: () => localStorage.getItem(_essenceId),
    getEssenceName: () => localStorage.getItem(_essenceName),
    getEssenceEmail: () => localStorage.getItem(_essenceEmail),
    getAccessLevel: () => localStorage.getItem(_accessLevel),

}

export {authService}