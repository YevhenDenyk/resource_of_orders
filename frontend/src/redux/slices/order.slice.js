import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../../services";

const initialState = {
    orders: {},
    errors: null,
}

const getAll = createAsyncThunk(
    'orderSlice/getAll',
    async (filter, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getAll(filter);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            //
            .addDefaultCase((state, action) => {
                const [pathsElement] = action.type.split('/').splice(-1);
                if (pathsElement === 'rejected') {
                    state.errors = action.payload
                    // state.loading = false
                } else {
                    state.errors = null
                }
            })
});

const {reducer: orderReducer, action} = orderSlice;

const orderAction = {
    getAll
};

export {orderAction, orderReducer};
