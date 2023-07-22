import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer} from "./slices";

const rootReducers = combineReducers({
    orderReducer
});

const setupStore = () => configureStore({reducer:rootReducers});

export {setupStore}
