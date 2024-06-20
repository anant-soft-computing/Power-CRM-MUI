import React, { useState } from "react";
import { Typography, Box, Toolbar, Card } from "@mui/material";
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

        <Card sx={{ p: 3, m: 2, boxShadow: 3 }}>
          <Box >
            <AddCompany />
          </Box>
        </Card>

        <Card sx={{ p: 3, m: 2, boxShadow: 3 }} >
          <Box >
            <CompanyDataTable
              onAddSite={handleAddSite}
              onEditCompany={handleEditCompany}
            />
          </Box>
        </Card>

      </Box>
    </Box>
  );
};

export default CompanyList;
