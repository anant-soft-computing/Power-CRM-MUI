import React from "react";
import { Box, Toolbar, Typography, Container } from "@mui/material";
import SiteReport from "./SiteReport";
import QuoteReport from "./QuoteReport";
import RecentSites from "./RecentSites";

const drawerWidth = 240;

function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 1,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <SiteReport />
          <QuoteReport />
        </Box>
        <RecentSites />
      </Container>
    </Box >
  );
}

export default Dashboard;
