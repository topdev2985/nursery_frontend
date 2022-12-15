import React from "react";
import { Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {selectSnackbar, snackbarToggle} from '../reducers/uiSlice';

export default function CustomSnackbar(){
    const {open, message}=useSelector(selectSnackbar);
    const dispatch=useDispatch();
    const handleClose=()=>{
        dispatch(snackbarToggle({open:false, message:''}));
    }
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={message}
        />
    )
}