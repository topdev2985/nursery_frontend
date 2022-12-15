import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {fetchInvoiceApi} from '../actions/invoiceApi';

const initialState={
    invoices:{
        service:[],
        memoInfo:[]
    }
}

export const fetchInvoice=createAsyncThunk(
    'invoice/fetchinvoice',
    async(data)=>{
        const response=await fetchInvoiceApi(data);
        // console.log(response.data);
        return response.data;
    }
)

export const invoicSlice = createSlice({
    name:'invoice',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchInvoice.fulfilled, (state, action)=>{
            state.invoices=action.payload;
        })
    }
})

export const selectInvoice=(state)=>state.invoice;

export default invoicSlice.reducer;
