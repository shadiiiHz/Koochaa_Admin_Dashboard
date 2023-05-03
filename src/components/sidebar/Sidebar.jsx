import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
const SideBar = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
  ${mobile({ display: "none" })}
`;
const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;
const SidebarTitle = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;
const SidebarList = styled.ul`
  list-style: none;
  padding: 5px;
`;
const SidebarListItem = styled.li`
font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: rgb(240, 240, 255);
    color: #999966;
  }
`;
export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };
  const admin = useSelector((state) => state.user.isAdmin);
  console.log(admin);
  let isAdmin = admin;
  if (isAdmin)
    return (
      <SideBar>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarTitle>Dashboard</SidebarTitle>
            <SidebarList>
              <Link to="/" className="link">
                <SidebarListItem>
                  <LineStyle className="sidebarIcon" />
                  Home
                </SidebarListItem>
              </Link>
            </SidebarList>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarTitle>Location</SidebarTitle>
            <SidebarList>
              <Link to="/continents" className="link">
                <SidebarListItem>
                  <PermIdentity className="sidebarIcon" />
                  Continent
                </SidebarListItem>
              </Link>
              <Link to="/country" className="link">
                <SidebarListItem>
                  <Storefront className="sidebarIcon" />
                  Country
                </SidebarListItem>
              </Link>
              <Link to="/city" className="link">
                <SidebarListItem>
                  <AttachMoney className="sidebarIcon" />
                  City
                </SidebarListItem>
              </Link>
            </SidebarList>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarTitle>Categories</SidebarTitle>
            <SidebarList>
              <Link to="/category" className="link">
                <SidebarListItem>
                  <BarChart className="sidebarIcon" />
                  Category
                </SidebarListItem>
              </Link>
            </SidebarList>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarTitle>units</SidebarTitle>
            <SidebarList>
              <Link to="/unit" className="link">
                <SidebarListItem>
                  <DynamicFeed className="sidebarIcon" />
                  unit
                </SidebarListItem>
              </Link>
            </SidebarList>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarTitle>users</SidebarTitle>
            <SidebarList>
              <Link to="/users" className="link">
                <SidebarListItem>
                  <ChatBubbleOutline className="sidebarIcon" />
                  userList
                </SidebarListItem>
              </Link>
            </SidebarList>
          </SidebarMenu>
        </SidebarWrapper>
      </SideBar>
      // <div className="sidebar">
      //   <div className="sidebarWrapper">
      //     <div className="sidebarMenu">
      //       <h3 className="sidebarTitle">Dashboard</h3>
      //       <ul className="sidebarList">
      //         <Link to="/" className="link">
      //           <li className="sidebarListItem">
      //             <LineStyle className="sidebarIcon" />
      //             Home
      //           </li>
      //         </Link>
      //         <li className="sidebarListItem">
      //           <Timeline className="sidebarIcon" />
      //           Analytics
      //         </li>
      //         <li className="sidebarListItem">
      //           <TrendingUp className="sidebarIcon" />
      //           Sales
      //         </li>
      //       </ul>
      //     </div>
      //     <div className="sidebarMenu">
      //       <h3 className="sidebarTitle">Location</h3>
      //       <ul className="sidebarList">
      //         <Link to="/continents" className="link">
      //           <li className="sidebarListItem">
      //             <PermIdentity className="sidebarIcon" />
      //             Continent
      //           </li>
      //         </Link>
      //         <Link to="/country" className="link">
      //           <li className="sidebarListItem">
      //             <Storefront className="sidebarIcon" />
      //             Country
      //           </li>
      //         </Link>
      //         <li className="sidebarListItem">
      //           <AttachMoney className="sidebarIcon" />
      //           City
      //         </li>
      //         <li className="sidebarListItem">
      //           <BarChart className="sidebarIcon" />
      //           Reports
      //         </li>
      //       </ul>
      //     </div>
      //     <div className="sidebarMenu">
      //       <h3 className="sidebarTitle">Notifications</h3>
      //       <ul className="sidebarList">
      //         <li className="sidebarListItem">
      //           <MailOutline className="sidebarIcon" />
      //           Mail
      //         </li>
      //         <li className="sidebarListItem">
      //           <DynamicFeed className="sidebarIcon" />
      //           Feedback
      //         </li>
      //         <li className="sidebarListItem">
      //           <ChatBubbleOutline className="sidebarIcon" />
      //           Messages
      //         </li>
      //       </ul>
      //     </div>
      //     <div className="sidebarMenu">
      //       <h3 className="sidebarTitle">Staff</h3>
      //       <ul className="sidebarList">
      //         <li className="sidebarListItem">
      //           <WorkOutline className="sidebarIcon" />
      //           Manage
      //         </li>
      //         <li className="sidebarListItem">
      //           <Timeline className="sidebarIcon" />
      //           Analytics
      //         </li>
      //         <li className="sidebarListItem">
      //           <Report className="sidebarIcon" />
      //           Reports
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // </div>
    );
}
