import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
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

  const navItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon color="primary" />,
      path: "/Dashboard",
    },
    {
      text: "Company",
      icon: <BusinessIcon color="primary" />,
      path: "/Companies",
    },
    {
      text: "Sites",
      icon: <AccountTreeIcon color="primary" />,
      path: "/Sites",
    },
    {
      text: "Generate Quote",
      icon: <FormatQuoteIcon color="primary" />,
      path: "/Quotes",
    },
    { text: "LogOut", icon: <LogoutIcon color="primary" />, action: logout },
  ];

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
        {navItems.map(({ text, path, action, icon }) => (
          <ListItem
            button
            key={text}
            onClick={() => (path ? navigate(path) : action())}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
