import React, { useEffect, useRef, useState } from "react";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import styled, { css } from "styled-components";

import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";

import { profileUpload } from "../../../actions/childrenApi";
import { setChild, selectChild } from "../../../reducers/childrenReducer";

const Container = styled.div`
position: fixed;
z-index: 100000;
width: 700px;
height: 700px;
top: calc(50vh - 350px);
left: calc(50vw - 350px);
border: 1px solid;
padding: 20px;
background: white;
visibility:hidden;
@media(max-width:800px){
    width: 400px;
    height: 400px;
    top: calc(50vh - 200px);
    left: calc(50vw - 200px);
}
${({ $open }) => $open && css`
        visibility:visible;
`}

`;

const ImageOpenButton = styled.div`
margin: 20px 0 20px 0;
padding: 10px;
width: 150px;
text-align: center;
background-color: #1976d2;
cursor:pointer;
&:hover{
    background-color:#3b8bd9;
}
`;

const UploadButton = styled.button`
border: 0;
background: #25891f;
color: white;
font-size: 16px;
padding: 10px;
width: 150px;
cursor:pointer;
margin:20px 0 20px 0;
&:hover{
    background-color:#359f2e;
}
`;

const StyledImg = styled.img`
border: 0px solid #f00;
    border-radius: 50%;
    width: 61%;
  
    margin-right: auto;
    margin-left: auto;
    margin-top: 30px;
    cursor:pointer;
`;

export default function AvartarCrop() {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const profile=useSelector(selectChild).profile;

    const [imgSrc, setImgSrc] = useState('');
    const imgRef = useRef(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [image, setImage] = useState(null);
    const [output, setOutput] = useState(null);

    function centerAspectCrop(
        mediaWidth,
        mediaHeight,
        aspect
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '')
            })
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e) {
        const { width, height } = e.currentTarget;
        setImage(e.currentTarget);
        setCrop(centerAspectCrop(width, height, 9 / 9));

    }
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    setOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const cropImageNow = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = completedCrop.width * pixelRatio;
        canvas.height = completedCrop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height,
        );



        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');
        setOutput(base64Image);

        canvas.toBlob(blob => {
            const newImage = new File([blob], 'profile', { type: blob.type });
            const formData = new FormData();
            formData.append(
                "profile",
                newImage,
                newImage.name
            )

            profileUpload(formData, (res) => {
                console.log(res);
                dispatch(setChild({ profile: res.data.filepath }));
            });
        })


    };


    return (
        <>
            <StyledImg src={profile ? profile : '/images/1.jpg'} alt="Select img" onClick={() => {
                setOpen(true);
            }} />
            <Container
                ref={wrapperRef}
                $open={open}
            >
                <div style={{ display: 'flex', gap: '20px' }}>
                    <input type="file" id="contained-button-file" style={{ display: 'none' }} accept="image/*" onChange={onSelectFile} />
                    <label htmlFor="contained-button-file">
                        <ImageOpenButton>Open Image</ImageOpenButton>
                    </label>

                </div>

                {!!imgSrc && (
                    <>
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => {
                                setCrop(percentCrop);
                                // console.log('percentcrop ', percentCrop);
                            }}
                            onComplete={(c) => {
                                // console.log('complete', c);
                                setCompletedCrop(c)
                            }}
                            aspect={9 / 9}
                        // onImageLoad={setImage}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                style={{ transform: `scale(${scale})`, visibility:open?'visible':'hidden' }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                        <UploadButton
                            onClick={(e) => {
                                e.preventDefault();
                                cropImageNow();
                                setOpen(false);
                            }}
                        >Upload</UploadButton>
                    </>

                )}


            </Container>
        </>

    )
}