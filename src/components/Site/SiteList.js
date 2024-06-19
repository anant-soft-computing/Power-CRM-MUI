import React, { useState } from "react";
import { Typography, Paper, Box, Grid, Toolbar } from "@mui/material";
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
    // <Box sx={{ flexGrow: 1, p: 3 }}>
    //   <Paper sx={{ p: 3 }}>
    //     <Typography variant="h4" gutterBottom>
    //       Sites
    //     </Typography>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <AddSite />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <SiteDataTable
    //           onEditSite={handleEditSite}
    //           onCreateQuote={handleCreateQuote}
    //         />
    //       </Grid>

    //     </Grid>
    //   </Paper>
    // </Box>

    <Box sx={{ display: "flex" }}>

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

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <AddSite />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
