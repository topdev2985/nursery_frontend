import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { insertNewChild, fetchChilrenApi, deleteChildApi, editChildApi } from "../actions/childrenApi";


const initialState = {
    children: [],
    child: {
        profile: '/images/1.jpg',
        parentName: '',
        firstName: '',
        surName: '',
        birthday: '11/11/2022',
        funded: false,
        holdingFee: 0,
        discount: 0,
        active: true
    },
    isNew: true,
    selectedChildId: ''

};

export const fetchChildren = createAsyncThunk(
    'child/fetchchildren',
    async () => {
        const response = await fetchChilrenApi();
        return response.data;
    }
)


export const childrenSlice = createSlice({
    name: 'child',
    initialState,
    reducers: {
        setChild: (state, action) => {
            state.child = { ...state.child, ...action.payload };

        },
        setIsNew: (state, action) => {
            state.isNew = action.payload;
        },
        clearChild:(state)=>{
            state.child={
                profile: '/images/1.jpg',
                parentName: '',
                firstName: '',
                surName: '',
                birthday: '11/11/2022',
                funded: false,
                holdingFee: 0,
                discount: 0,
                active: true
            };
        },
        setSelectedChildId: (state, action) => {
            state.selectedChildId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChildren.pending, state => {

            })
            .addCase(fetchChildren.fulfilled, (state, action) => {
                state.children = action.payload;
            })
    }
});

export const selectChild = (state) => state.children.child;
export const selectChildren = (state) => state.children.children;
export const selectIsNew = (state) => state.children.isNew;
export const selectChildId = (state) => state.children.selectedChildId;

export const { setChild, setIsNew, setSelectedChildId, clearChild } = childrenSlice.actions;

export const insertChild = () => (dispatch, getState) => {
    console.log('this is child');
    const child = selectChild(getState());
    insertNewChild(child, (res) => {
        console.log('res');
        dispatch(fetchChildren());
    })

}

export const deleteChild = (childId) => (dispatch, getState) => {
    deleteChildApi(childId, (res) => {
        dispatch(fetchChildren());
    })
}

export const editChild = (childId) => (dispatch, getState) => {
    const child = selectChild(getState());
    editChildApi(childId, child, (res) => {
        dispatch(fetchChildren());
    })
}

export default childrenSlice.reducer;

