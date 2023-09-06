import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {locationService} from "../../services";

const initialState = {
    locations: [],
    location: {},
    locationUsers: [],
    page: null,
    count: null,
    limit: null,
    errors: null,
}

const getAll = createAsyncThunk(
    'locationSlice/getAll',
    async (filter, {rejectWithValue}) => {
        try {
            const {data} = await locationService.getAll(filter);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getById = createAsyncThunk(
    'locationSlice/getById',
    async (_id, {rejectWithValue}) => {
        try {
            const {data} = await locationService.getById(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const locationSlice = createSlice({
    name: 'locationSlice',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload
        },
        putUpdateLocation: (state, action) => {
            state.location = Object.assign(state.location, action.payload.data)
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.locations = action.payload.locations
                state.page = action.payload.page
                state.count = action.payload.count
                state.limit = action.payload.limit
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.location = action.payload
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

const {reducer: locationReducer, actions: {setLocation, putUpdateLocation}} = locationSlice;

const locationAction = {
    getAll, getById, setLocation, putUpdateLocation
};

export {locationReducer, locationAction};
