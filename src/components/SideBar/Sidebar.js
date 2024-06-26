import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authStore";
import { deleteFromLocalStorage } from "../../helpers/helper";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      authAction.setAuthStatus({
        userName: "",
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        userId: null,
        user_type: null,
        timeOfLogin: null,
        logInOperation: -1,
      })
    );
    navigate("/");
    deleteFromLocalStorage("loginInfo");
  };

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 0,
        position: "fixed",
        height: "100%",
        backgroundColor: "#f1f1f1",
        transition: "width 0.3s",
        overflowX: "hidden",
        paddingTop: "66px",
        marginLeft: "-5px",
      }}
    >
      <List>
        <ListItem
          button
          key="Dashboard"
          onClick={() => navigate("/Dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          key="Company"
          onClick={() => navigate("/Companies")}
        >
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Company" />
        </ListItem>

        <ListItem button key="Sites" onClick={() => navigate("/Sites")}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Sites" />
        </ListItem>

        <ListItem
          button
          key="Generate Quote"
          onClick={() => navigate("/Quotes")}
        >
          <ListItemIcon>
            <FormatQuoteIcon />
          </ListItemIcon>
          <ListItemText primary="Generate Quote" />
        </ListItem>

        <ListItem button key="LogOut" onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="LogOut" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;