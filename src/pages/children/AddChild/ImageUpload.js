// imports the React Javascript Library
import React, { useEffect, useState } from "react";

import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from '@mui/icons-material/AddAPhotoOutlined';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { profileUpload } from "../../../actions/childrenApi";
import { setChild } from "../../../reducers/childrenReducer";
const ImageContainer = styled.div`
   padding: 40px
`;


export default function ImageUpload(props) {
  

  const dispatch = useDispatch();
  // const child=useSelector(selectChild);
  
  const [state, setState] = useState({
    mainState: "initial", // initial, search, gallery, uploaded
    imageUploaded: 0,
    selectedFile:''
  });
  useEffect(()=>{
    setState({selectedFile:props.profile});
  }, [props])
  const handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setState({
        selectedFile: [reader.result]
      });
    };
    console.log(url); // Would see a path?

    setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });

    const formData = new FormData();
    formData.append(
      "profile",
      file,
      file.name
    )

    profileUpload(formData, (res)=>{
      console.log(res);
      dispatch(setChild({profile:res.data.filepath}));
    });
    
  };



  return (
    <ImageContainer>
      <img src={state.selectedFile} style={{ width: '100%' }} />
      <input
        accept="image/*"
        id="contained-button-file"
        multiple 
        type="file"
        style={{ display: 'none' }}
        onChange={handleUploadClick}
      />
      <label htmlFor="contained-button-file">
        <Fab component="span" >
          <AddPhotoAlternateIcon />
        </Fab>
      </label>
    </ImageContainer>
  );
}


