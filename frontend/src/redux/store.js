import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer, userReducer} from "./slices";

const rootReducers = combineReducers({
    orderReducer,
    userReducer
});

const setupStore = () => configureStore({reducer:rootReducers});

export {setupStore}
