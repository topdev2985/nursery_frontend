import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newChildModalOpen: false,
    newAttendanceOpen: false,
    snackbar: {
        open: false,
        message: ''
    },
    attendanceDetailOpen: false

};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        newChildModalToggle: (state, action) => {
            state.newChildModalOpen = action.payload
        },
        newAttendanceModalToggle: (state, action) => {
            state.newAttendanceOpen = action.payload;
        },
        snackbarToggle: (state, action) => {
            state.snackbar = action.payload;
            // state.message = action.payload.message;
        },
        attendanceDetailToggle: (state, action) => {
            state.attendanceDetailOpen = action.payload;
        }
    }
});

export const selectChildModal = (state) => state.ui.newChildModalOpen;
export const selectAttendanceModal = (state) => state.ui.newAttendanceOpen;
export const selectSnackbar = (state) => state.ui.snackbar;
export const selectAttendanceDetail = (state) => state.ui.attendanceDetailOpen;

export const { newChildModalToggle, newAttendanceModalToggle, snackbarToggle, attendanceDetailToggle } = uiSlice.actions;

export default uiSlice.reducer;
