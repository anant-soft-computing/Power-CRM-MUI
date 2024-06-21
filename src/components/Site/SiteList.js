import React, { useState } from "react";
import { Typography, Box, Container, Toolbar, Card } from "@mui/material";
import SiteDataTable from "./SiteDataTable";
import AddSite from "./AddSite";

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
      <Container
        component="main"
        sx={{
          marginTop: 1,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Sites
        </Typography>

        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box >
            <AddSite />
          </Box>
        </Card>

        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box >
            <SiteDataTable
              onEditSite={handleEditSite}
              onCreateQuote={handleCreateQuote}
            />
          </Box>
        </Card>
      </Container>
    </Box >
  );
};

export default SiteList;
