import React, { useState } from "react";
import { Typography, Paper, Box, Toolbar } from "@mui/material";
import CompanyDataTable from "./CompanyDataTable";
import AddCompany from "./AddCompany";


const drawerWidth = 240;


const CompanyList = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleAddSite = (company) => {
    setSelectedCompany(company);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
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
          Companies
        </Typography>

        <Box >
          <AddCompany />
        </Box>

        <Box >
          <CompanyDataTable
            onAddSite={handleAddSite}
            onEditCompany={handleEditCompany}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyList;
