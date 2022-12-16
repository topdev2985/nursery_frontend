import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WidgetsIcon from "@mui/icons-material/Widgets";
import { IconButton } from "@mui/material";

import serverurl from "./actions/serverurl";

import { useNavigate } from "react-router-dom";

import CustomSnackbar from "./components/CustomSnackbar";



import "./App.css";

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  background-color: hsl(233, 31%, 17%);
  height: clamp(72px, 10.5vw, 80px);
  transition: background-color 400s ease-in-out;
  z-index: 100;
  position:fixed;
  left:0;
  right:0;
  @media (min-width: 1024px) {
    top: 0;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto auto;
    height: 100vh;
    width: 103px;
    border-radius: 0 20px 20px 0;
  }
`;

const StyledButton = styled(Link)`
  border: none;
  display:block;
  background: transparent;
  padding: 25px 0 25px 0;
  font-size: 25px;
  color: #575a6c;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #232e52;
    color: hsl(252, 100%, 73%);
    transition: color 0.5s;
    .text {
      left: 105px;
      color: hsl(252, 100%, 73%);
      background-color: #232e52;
      padding: 32px;
      margin-top: -25px;
      border-radius: 20px 20px 20px 20px;
      font-weight: bold;
      transition: left 0.5s;
    }
  }
  .text {
    left: -400px;
    position: absolute;
  }
  .icon {
    & .MuiSvgIcon-root {
      font-size: 2.5rem;
    }
  }
  @media (min-width: 1024px) {
    .icon {
    }
  }
`;

const Logo = styled(Link)`
  position: relative;
  background-color: hsl(252, 94%, 67%);
  width: clamp(72px, 10.5vw, 80px);
  height: 100%;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 50px;
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px dashed hsl(252, 94%, 67%);
    outline-offset: 2px;
  }

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsl(252, 100%, 73%);
    border-radius: 20px 0;
  }

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    width: 28px;
    height: 28px;
    background-image: url("logo.svg");
    background-repeat: no-repeat;
    background-size: contain;
    transform: translate(-50%, -50%);

    @media (min-width: 768px) {
      width: 31px;
      height: 31px;
    }

    @media (min-width: 1024px) {
      width: 40px;
      height: 40px;
    }
  }

  @media (min-width: 1024px) {
    width: 100%;
    height: 103px;
  }
`;

const Profile = styled.div`
  position: relative;
  width: clamp(80px, 12.5vw, 96px);
  border-left: 1px solid hsl(231, 20%, 36%);
  text-align: center;
  & .MuiSvgIcon-root {
    font-size: 3rem;
  }
  color: hsl(252, 94%, 67%);
  padding-top: 15px;
  cursor: pointer;
  &:hover {
    color: white;
  }

  @media (min-width: 1024px) {
    height: 88px;
    width: 100%;
    border-left: unset;
    border-top: 1px solid hsl(231, 20%, 36%);
  }
`;

const StyledButtonGroup = styled.div`
  z-index:100000;
  @media (max-width: 1024px) {
    position: absolute;
    top: clamp(72px, 10.5vw, 80px);
    left: -100px;
    height: 100vh;
    background: hsl(233, 31%, 17%);
    width: clamp(72px, 10.5vw, 80px);
    transition: left 1s;
  }
`;

const GroupMenu = styled.div`
  visibility: hidden;
  text-align: right;
  color: white;
  @media (max-width: 1024px) {
    visibility: visible;
  }
`;

const MainContent = styled.div`
  position: absolute;
  width: calc(100% - 103px);
  height:100vh;
  top: 0px;
  left: 103px;
  background-color: rgb(20, 22, 36);
  @media (max-width: 1024px) {
    width:100%;
    left: 0;
    top: clamp(72px, 10.5vw, 80px);
  }
`;

const menuList = [
  {
    name: "Attendance",
    link: "/attendance",
    icon: <DriveFileRenameOutlineIcon />,
  },
  {
    name: "Children",
    link: "/children",
    icon: <ChildCareIcon />,
  },
  {
    name: "Products/Services",
    link: "/services",
    icon: <BabyChangingStationIcon />,
  },
  {
    name: "Reports",
    link: "/reports",
    icon: <ReceiptIcon />,
  },
  {
    name: "Invoices",
    link: "/invoices",
    icon: <SummarizeIcon />,
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setSidebarOpen(false);
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

  const navigate=useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token===null)navigate('/login');
    else if(token!==null){
      fetch(`${serverurl}/isAuthUsers`, {
        headers:{
          'x-access-token':token
        }
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.isLoggedIn){
          navigate('/attendance')
        }
        else navigate('/login')
      })
    }
  },[])

 

  return (
    <div style={{backgroundColor:'hsl(231,30%,11%)', height:'100vh'}}>
      <Header>
        <Logo />
        <StyledButtonGroup
          style={{
            left: sidebarOpen ? "0" : "-100px",
          }}
          ref={wrapperRef}
        >
          {menuList.map((menu, index) => (
            <StyledButton key={index} to={menu.link}>
              <span className="icon">{menu.icon}</span>
              <span className="text">{menu.name}</span>
            </StyledButton>
          ))}
        </StyledButtonGroup>
        <GroupMenu>
          <IconButton
            onClick={() => {
              setSidebarOpen(true);
            }}
          >
            <WidgetsIcon
              sx={{
                fontSize: "2.5rem",
                marginTop: "11px",
                marginRight: "25px",
                color: "white",
              }}
            />
          </IconButton>
        </GroupMenu>
        <Profile onClick={()=>{
          localStorage.clear();
          navigate('/login')
        }}>
          <ExitToAppIcon />
        </Profile>
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
      <CustomSnackbar />
    </div>
  );
}

export default App;
