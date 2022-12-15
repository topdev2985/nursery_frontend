import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fectchTest } from '../actions/testAPI';

const initialState = {
    message: 'This is initial messgae',
    status: 'idle'
};

export const testAsync = createAsyncThunk(
    'tester/fectchTest',
    async () => {
        
        const response = await fectchTest();
        return response.data.message;
    }
)

export const messgaeChange = createSlice({
    name: "test",
    initialState,
    reducers: {
        change1: (state, action) => {
            state.message = action.payload + " --- change1";
        },
        change2: (state, action) => {
            state.message = action.payload + " --- change2";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(testAsync.pending, (state) => {
            state.status = 'loading'
        }).addCase(testAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.message = action.payload;
        })
    }
});

export const { change1, change2 } = messgaeChange.actions;

export const selectMessage = (state) => state.tester.message;

export default messgaeChange.reducer;
