import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { saveRegisterValuesApi, fetchAttendantChildrenApi, fetchAttendantChildActivityApi, updateAttendantChildActivityApi } from "../actions/attendanceApi";
const initialState = {
    selectedChildren: [],
    registerValues: {
        entryTime: (new Date()).toString(),
        endTime: (new Date()).toString(),
        holdingFee: false,
        meal: false,
        holdingFee_type: '',
        holdingFee_name: '',
        holdingFee_desc: ''
    },
    attendantChildren: [],
    attendantChildDetail: {
        _id: '',
        entryTime: '',
        endTime: '',
        holdingFee: false,
        meal: false,
        holdingFee_desc: '',
        holdingFee_type: '',
        holdingFee_name: ''
    },
    attendantChildActivity: []
};

export const saveRegisterValues = () => (dispatch, getState) => {
    const selChildren = selectAttendance(getState()).selectedChildren;
    const values = selectAttendance(getState()).registerValues;
    console.log(values);
    if (selChildren.length === 0) return;
    saveRegisterValuesApi(selChildren, values, (res) => {
        dispatch(setSelectedChildrenToEmpty());
    })

};

export const fetchAttendantChildren = createAsyncThunk(
    'attendance/fetchchildren',
    async () => {
        const today = dayjs(new Date()).format('YYYY-MM-DD');
        const response = await fetchAttendantChildrenApi(today);
        return response.data;
    }
);

export const fetchAttendantChildActivity = createAsyncThunk(
    'attendance/fetchattendantchildactivity',
    async (childId) => {
        const today = dayjs(new Date()).format('YYYY-MM-DD');
        const response=await fetchAttendantChildActivityApi(today, childId);
        return response.data;
    }
);

export const updateAttendantChildActivity=(attId)=>(dispatch, getState)=>{
    const registerValues=selectAttendance(getState()).registerValues;
    console.log(registerValues, attId);

    updateAttendantChildActivityApi(attId, registerValues, (res)=>{
        console.log('update registervalue success');
    });
}



export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        setSelectedChildren: (state, action) => {
            const selected = action.payload.selected;
            const childId = action.payload.childId;
            if (selected) {
                let temp = state.selectedChildren;
                temp.push(childId);
                state.selectedChildren = temp;
            }
            else {
                let temp = state.selectedChildren;
                const index = temp.indexOf(childId);
                temp.splice(index, 1);
                state.selectedChildren = temp;
            }
        },
        setSelectedChildrenToEmpty: (state) => {
            state.selectedChildren = [];
        },
        setRegisterValue: (state, action) => {
            state.registerValues = { ...state.registerValues, ...action.payload };
        },
        setAttendantChildDetail: (state, action) => {
            state.attendantChildDetail = { ...state.attendantChildDetail, ...action.payload };
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttendantChildren.pending, state => {

            })
            .addCase(fetchAttendantChildren.fulfilled, (state, action) => {
                state.attendantChildren = action.payload;
            })
            .addCase(fetchAttendantChildActivity.fulfilled, (state, action) => {
                console.log(action.payload);
                state.attendantChildActivity = action.payload;
            })
    }
})

export const { setSelectedChildren, setRegisterValue, setSelectedChildrenToEmpty, setAttendantChildDetail } = attendanceSlice.actions;

export const selectAttendance = (state) => state.attendance;

export default attendanceSlice.reducer;

