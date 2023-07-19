const baseURL = '/api';

const urls = {
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
        logout: '/auth/logout',
        forgotPassword: '/auth/password/forgot',
    },

    commit: '/commits',
    contractors: '/contractors',
    jobTypes: '/jobTypes',
    locations: '/locations',
    orders: '/orders',
    users: '/users',
};

export {baseURL, urls}