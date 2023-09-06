import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {orderReducer, userReducer, contractorReducer, locationReducer} from "./slices";

const rootReducers = combineReducers({
    orderReducer,
    userReducer,
    contractorReducer,
    locationReducer
});

const setupStore = () => configureStore({reducer: rootReducers});

export {setupStore}
