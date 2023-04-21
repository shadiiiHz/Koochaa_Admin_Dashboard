import React from "react";
// import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
const TopBar = styled.div`
  width: 100vw;
  height: 50px;
  background-color: #f5f5f0;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const TopbarWrapper = styled.div`
  height: 100%;
  /* width: 100vw; */
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopLeft = styled.div`
  flex: 1;
`;
const TopRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;
const Logo = styled.span`
  margin-left: 10px;
  font-weight: bold;
  font-size: 30px;
  color: #999966;
  cursor: pointer;
  font-family: "Delicious Handrawn", cursive;
`;

export default function Topbar() {
  const admin = useSelector((state) => state.user.isAdmin);
  console.log(admin);
  let isAdmin = admin;
  if (isAdmin) {
    return (
      <TopBar>
        <TopbarWrapper>
          <TopLeft>
            <Logo>Dashboard</Logo>
          </TopLeft>
          <TopRight>
            <DropdownButton
              id="dropdown-basic-button"
              title="Menu"
              variant="Secondary"
              style={{ backgroundColor: "#d5c8a9", outline: "none", borderRadius: "20px" }}
              className="hover"
            >
              <Dropdown.Item>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#999966" }}
                >
                  Home
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/continents"
                  style={{ textDecoration: "none", color: "#999966" }}
                >
                  continents
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/country"
                  style={{ textDecoration: "none", color: "#999966" }}
                >
                  country
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/city"
                  style={{ textDecoration: "none", color: "#999966" }}
                >
                  city
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to="/unit"
                  style={{ textDecoration: "none", color: "#999966" }}
                >
                  unit
                </Link>
              </Dropdown.Item>
            </DropdownButton>
          </TopRight>
        </TopbarWrapper>
      </TopBar>
      // <div className="topbar">
      //   <div className="topbarWrapper">
      //     <div className="topLeft">
      //       <span className="logo">Dashboard</span>
      //     </div>
      //     <div className="topRight">
      //       <div className="topbarIconContainer">
      //         <NotificationsNone />
      //         <span className="topIconBadge">2</span>
      //       </div>
      //       <div className="topbarIconContainer">
      //         <Language />
      //         <span className="topIconBadge">2</span>
      //       </div>
      //       <div className="topbarIconContainer">
      //         <Settings />
      //       </div>
      //       <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
      //     </div>
      //   </div>
      // </div>
    );
  } else {
    return (
      <TopBar>
        <TopbarWrapper>
          <TopLeft>
            <Logo>Dashboard...</Logo>
          </TopLeft>
        </TopbarWrapper>
      </TopBar>
      // <div className="topbar">
      //   <div className="topbarWrapper">
      //     <div className="topLeft">
      //       <span className="logo2">Dashboard...</span>
      //     </div>
      //     <div className="topRight">
      //       <div className="topbarIconContainer">
      //         <NotificationsNone />
      //         <span className="topIconBadge">2</span>
      //       </div>
      //       <div className="topbarIconContainer">
      //         <Language />
      //         <span className="topIconBadge">2</span>
      //       </div>
      //       <div className="topbarIconContainer">
      //         <Settings />
      //       </div>
      //       <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
      //     </div>
      //   </div>
      // </div>
    );
  }
}
