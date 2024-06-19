import React, { useState } from "react";
import { Typography, Paper, Box, Drawer } from "@mui/material";
import SiteDataTable from "./SiteDataTable";
import AddSite from "./AddSite";
import GenerateQuote from "./GenerateQuote";

const SiteList = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleEditSite = (site) => {
    setSelectedSite(site);
  };

  const handleCreateQuote = (site) => {
    setSelectedSite(site);
    setDrawerOpen(true);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sites
      </Typography>
      <Box sx={{ mb: 2 }}>
        <AddSite />
      </Box>
      <SiteDataTable
        onEditSite={handleEditSite}
        onCreateQuote={handleCreateQuote}
      />
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 450, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Create Quote
          </Typography>
          {selectedSite && <GenerateQuote site={selectedSite} />}
        </Box>
      </Drawer>
    </Paper>
  );
};

export default SiteList;
