import React, { useState } from "react";
import { Typography, Paper, Box, Grid, Toolbar, Card } from "@mui/material";
import SiteDataTable from "./SiteDataTable";
import AddSite from "./AddSite";
import GenerateQuote from "../GeneralQuote/GenerateQuote";

const drawerWidth = 240;


const SiteList = () => {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleEditSite = (site) => {
    setSelectedSite(site);
  };

  const handleCreateQuote = (site) => {
    setSelectedSite(site);
  };

  return (


    <Box >
      <Box
        component="main"
        sx={{
          p: 3,
          marginTop: 1,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Sites
        </Typography>

        <Box >
          <AddSite />
        </Box>

        <Box >
          <SiteDataTable
            onEditSite={handleEditSite}
            onCreateQuote={handleCreateQuote}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SiteList;
