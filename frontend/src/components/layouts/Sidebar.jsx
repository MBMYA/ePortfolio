import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import "../../assets/css/sidebar.css"

import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactsIcon from '@mui/icons-material/Contacts';
import MenuRoundedIcon from '@mui/icons-material/Menu';

const Side_bar = () => {
    let navigate = useNavigate();

    const  navigateClick = () => {
        navigate("/");
    }
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="sidebar">
          <Menu className="sidebar">
            <MenuItem icon={<MenuRoundedIcon />} className="menuElement">
              <h2 >ePortfolio</h2>
            </MenuItem>
            <MenuItem onClick={navigateClick} icon={<HomeIcon />} className="menuElement"> Home </MenuItem>
            <SubMenu icon={<AccountBoxIcon />} label="Profile" className="menuElement">
                <MenuItem className="menuElement"> View my profile </MenuItem>
                <MenuItem className="menuElement"> Edit my profile </MenuItem>
            </SubMenu>
            <MenuItem icon={<SettingsIcon />} className="menuElement"> Settings </MenuItem>
            <MenuItem icon={<ContactsIcon />} className="menuElement"> Contact Us </MenuItem>
            <MenuItem icon={<LogoutIcon />} className="menuElement"> Logout </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    );
  };
  export default Side_bar;