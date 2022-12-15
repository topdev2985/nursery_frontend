import React, { useState } from "react";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useSelector, useDispatch } from "react-redux";

function PhotoUpload({src}){
    const dispatch = useDispatch();
    const [crop, setCrop] = useState();
    
    return (
        <>
            <ReactCrop
                crop={crop}
                onChange={c=>{
                    setCrop(c);
                }}
            >
                <img src={src} />
            </ReactCrop>
        </>
    );
}

export default PhotoUpload;