import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    auth:false,
    user:{}
};

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth:(state, action)=>{
            state={...state, ...action.payload}
        }
    }
})

export const selectAuth=(state)=>state.auth;

export const {setAuth}=authSlice.actions;

export default authSlice.reducer;