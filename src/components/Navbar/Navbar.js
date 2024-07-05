import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/system";

const Navbar = ({ toggleSidebar }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          style={{ color: "white" }}
          aria-label="menu"
          edge="start"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ color: "white" }} noWrap>
          POWER CRM
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
