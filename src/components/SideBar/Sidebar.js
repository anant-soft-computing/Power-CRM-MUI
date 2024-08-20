import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ViewListIcon from "@mui/icons-material/ViewList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/authStore";
import { deleteFromLocalStorage } from "../../helpers/helper";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openCompany, setOpenCompany] = useState(false);
  const [openSite, setOpenSite] = useState(false);

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

  const handleCompany = () => {
    setOpenCompany(!openCompany);
    setOpenSite(false); // Ensure the Site section is closed when Company is opened
  };

  const handleSite = () => {
    setOpenSite(!openSite);
    setOpenCompany(false); // Ensure the Company section is closed when Site is opened
  };

  const navItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon color="primary" />,
      path: "/Dashboard",
    },
    {
      text: "Companies",
      icon: <BusinessIcon color="primary" />,
      action: handleCompany,
      subItems: [
        { text: "All Companies", path: "/Companies" },
        { text: "Create Company", path: "/AddCompany" },
        { text: "Add Company Document", path: "/CompanyDocument" },
      ],
    },
    {
      text: "Site",
      icon: <AccountTreeIcon color="primary" />,
      action: handleSite,
      subItems: [
        { text: "All Site", path: "/Sites" },
        { text: "Add Site Document", path: "/SiteDocument" },
      ],
    },
    // {
    //   text: "Documents",
    //   icon: <FileCopyIcon color="primary" />,
    //   path: "/Documents",
    // },
    {
      text: "MultiSite",
      icon: <ViewListIcon color="primary" />,
      path: "/MultiSites",
    },
    { text: "LogOut", icon: <LogoutIcon color="primary" />, action: logout },
  ];

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 0,
        position: "fixed",
        height: "100%",
        backgroundColor: "#ffffff",
        transition: "width 0.3s",
        overflowX: "hidden",
        paddingTop: "66px",
        marginLeft: "-5px",
      }}
    >
      <List>
        {navItems.map(({ text, path, action, icon, subItems }) => (
          <React.Fragment key={text}>
            <ListItem
              button
              onClick={() => (path ? navigate(path) : action ? action() : null)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
              {subItems &&
                (action ? (
                  action === handleCompany ? (
                    openCompany ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : action === handleSite ? (
                    openSite ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null
                ) : null)}
            </ListItem>
            {subItems && (
              <Collapse
                in={action === handleCompany ? openCompany : openSite}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      onClick={() => navigate(subItem.path)}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
