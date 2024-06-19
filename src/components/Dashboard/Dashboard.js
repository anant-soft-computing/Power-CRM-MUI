import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import SiteReport from "../SiteReport";
import QuoteReport from "../QuoteReport";
import RecentSites from "../RecentSites";

const drawerWidth = 240;

function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 1,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <SiteReport />
          <QuoteReport />
        </Box>
        <RecentSites />
      </Box>
    </Box>
  );
}

export default Dashboard;
