import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";

const initialState = {
    users: [],
    page: null,
    count: null,
    limit: null,
    user: {},
    errors: null,
}

const getAll = createAsyncThunk(
    'userSlice/getAll',
    async (filter, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAll(filter);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getById = createAsyncThunk(
    'userSlice/getById',
    async (_id, {rejectWithValue}) => {
        try {
            const {data} = await userService.getById(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        // putUpdateOrder: (state, action) => {
        //     state.order = Object.assign(state.order, action.payload.data)
        // }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.page = action.payload.page
                state.count = action.payload.count
                state.limit = action.payload.limit
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.user = action.payload
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

const {reducer: userReducer, actions} = userSlice;

const userAction = {
    getAll, getById
};

export {userAction, userReducer};
