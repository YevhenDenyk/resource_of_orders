import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {orderService} from "../../services";

const initialState = {
    orders: [],
    page: null,
    count: null,
    limit: null,
    order: {},
    comments: [],
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
const getById = createAsyncThunk(
    'orderSlice/getById',
    async (_id, {rejectWithValue}) => {
        try {
            const {data} = await orderService.getById(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setNewComment: (state, action) => {
            state.comments.push(action.payload)
        },
        putUpdateOrder: (state, action) => {
            state.order = Object.assign(state.order, action.payload.data)
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.orders = action.payload.orders
                state.page = action.payload.page
                state.count = action.payload.count
                state.limit = action.payload.limit
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.order = action.payload
                state.comments = action.payload.comments
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

const {reducer: orderReducer, actions: {setNewComment, putUpdateOrder}} = orderSlice;

const orderAction = {
    getAll, getById, setNewComment, putUpdateOrder
};

export {orderAction, orderReducer};
