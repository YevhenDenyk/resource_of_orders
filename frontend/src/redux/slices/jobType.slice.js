import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {jobTypeService} from "../../services";

const initialState = {
    jobTypes: [],
    // page: null,
    // count: null,
    // limit: null,
    // totalPage: null,
    jobType: null,
    errors: null,
}

const getAll = createAsyncThunk(
    'jobTypeSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await jobTypeService.getAll();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getById = createAsyncThunk(
    'jobTypeSlice/getById',
    async (_id_Location, {rejectWithValue}) => {
        try {
            const {data} = await jobTypeService.getById(_id_Location);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const jobTypeSlice = createSlice({
    name: 'jobTypeSlice',
    initialState,
    reducers: {
        setJobType: (state, action) => {
            state.jobType = action.payload
        },
        // putUpdateContractor: (state, action) => {
        //     state.contractor = Object.assign(state.contractor, action.payload.data)
        // }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.jobTypes = action.payload
                // state.page = action.payload.page
                // state.count = action.payload.count
                // state.limit = action.payload.limit
                // state.totalPage = action.payload.totalPage
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.jobType = action.payload
            })
            .addCase(getById.rejected, (state, action) => {
                state.jobType = null
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

const {reducer: jobTypeReducer, actions:{setJobType}} = jobTypeSlice;

const jobTypeAction = {
    getAll, getById, setJobType
};

export {jobTypeAction, jobTypeReducer};
