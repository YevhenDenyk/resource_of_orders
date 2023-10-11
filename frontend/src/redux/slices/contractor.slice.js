import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {contractorService} from "../../services";

const initialState = {
    contractors: [],
    page: null,
    count: null,
    limit: null,
    totalPage: null,
    contractor: {},
    errors: null,
}

const getAll = createAsyncThunk(
    'contractorSlice/getAll',
    async (filter, {rejectWithValue}) => {
        try {
            const {data} = await contractorService.getAll(filter);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);
const getById = createAsyncThunk(
    'contractorSlice/getById',
    async (_id, {rejectWithValue}) => {
        try {
            const {data} = await contractorService.getById(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);


const contractorSlice = createSlice({
    name: 'contractorSlice',
    initialState,
    reducers: {
        setContractor: (state, action) => {
            state.contractor = action.payload
        },
        putUpdateContractor: (state, action) => {
            state.contractor = Object.assign(state.contractor, action.payload.data)
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.contractors = action.payload.contractors
                state.page = action.payload.page
                state.count = action.payload.count
                state.limit = action.payload.limit
                state.totalPage = action.payload.totalPage
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.contractor = action.payload
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

const {reducer: contractorReducer, actions: {setContractor, putUpdateContractor}} = contractorSlice;

const contractorAction = {
    getAll, getById, setContractor, putUpdateContractor
};

export {contractorAction, contractorReducer};
