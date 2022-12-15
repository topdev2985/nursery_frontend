import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { insertNewServiceApi, fetchServiceApi, deleteServiceApi } from '../actions/serviceApi';

const initialState = {
    services: [],
    service: {
        serviceName: '',
        price: 0,
        type: '',
        description: '',
        startTime: '2018-01-01T08:00:00',
        endTime:'2018-01-01T13:00:00'
    }
};

export const fetchServiceAsync = createAsyncThunk(
    'service/fetchService',
    async () => {
        const response = await fetchServiceApi();
        return response.data;
    }
)

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setService: (state, action) => {
            state.service = { ...state.service, ...action.payload };
            // console.log(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceAsync.pending, state => {

            })
            .addCase(fetchServiceAsync.fulfilled, (state, action) => {
                state.services = action.payload;
            })
    }
});


export const { setService } = serviceSlice.actions;

export const selectServices = (state) => state.service;

export const insertNewService = () => (dispatch, getState) => {
    const service = selectServices(getState()).service;
    insertNewServiceApi(service, (res) => {
        dispatch(fetchServiceAsync());
    });
}

export const deleteService=(id)=>(dispatch, getState)=>{
    deleteServiceApi(id, (res)=>{
        dispatch(fetchServiceAsync());
    })
}

export default serviceSlice.reducer;