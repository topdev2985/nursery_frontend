import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const {open, handleClose}=props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={()=>handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root':{
            backgroundColor:'hsl(233,31%,17%)',
            color:'white',
            fontFamily:'inherit'
          }
          
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Confirm deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color:'white'}} id="alert-dialog-description">
            Are you sure you want to delete? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>Disagree</Button>
          <Button onClick={()=>handleClose(true)}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}