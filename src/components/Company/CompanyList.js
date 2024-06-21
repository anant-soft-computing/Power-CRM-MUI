import React, { useState } from "react";
import { Typography, Box, Toolbar, Card, Container } from "@mui/material";
import CompanyDataTable from "./CompanyDataTable";
import AddCompany from "./AddCompany";

const drawerWidth = 240;

const CompanyList = (onCompanyClick) => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleAddSite = (company) => {
    setSelectedCompany(company);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
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
          Companies
        </Typography>

        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box >
            <AddCompany />
          </Box>
        </Card>

        <Card sx={{ p: 2, m: 1, boxShadow: 3 }} >
          <CompanyDataTable
            onCompanyClick={onCompanyClick}
            onAddSite={handleAddSite}
            onEditCompany={handleEditCompany}
          />
        </Card>

      </Container>
    </Box >
  );
};

export default CompanyList;
