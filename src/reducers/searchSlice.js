import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearchApi } from '../actions/searchApi';

const initialState = {
    results: [],

}

export const fetchSearch = createAsyncThunk(
    'search/fetchSearch',
    async (data) => {
        const {dateStr, childId}=data;
        const response = await fetchSearchApi(dateStr, childId);
        return response.data;
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.results = action.payload;
                console.log(action.payload);
            })
    }
});

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;