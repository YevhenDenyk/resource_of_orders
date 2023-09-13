import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer, userReducer, contractorReducer, locationReducer, jobTypeReducer} from "./slices";

const rootReducers = combineReducers({
    orderReducer,
    userReducer,
    contractorReducer,
    locationReducer,
    jobTypeReducer
});

const setupStore = () => configureStore({reducer: rootReducers});

export {setupStore}
