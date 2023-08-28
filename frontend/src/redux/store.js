import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer, userReducer, contractorReducer} from "./slices";

const rootReducers = combineReducers({
    orderReducer,
    userReducer,
    contractorReducer
});

const setupStore = () => configureStore({reducer: rootReducers});

export {setupStore}
