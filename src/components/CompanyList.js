import React, { useState } from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import CompanyDataTable from "./CompanyDataTable";
import AddCompany from "./AddCompany";

const CompanyList = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleAddSite = (company) => {
    setSelectedCompany(company);
  };

  const handleEditCompany = (company) => {
    setSelectedCompany(company);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>
      <Box sx={{ mb: 2 }}>
        <AddCompany />
      </Box>
      <CompanyDataTable
        onAddSite={handleAddSite}
        onEditCompany={handleEditCompany}
      />
      {selectedCompany && (
        <Box>
          <Button
            variant="contained"
            onClick={() => console.log("Navigate to Add Site")}
          >
            Add Site to {selectedCompany.name}
          </Button>
          <Button
            variant="contained"
            onClick={() => console.log("Navigate to Edit Company")}
          >
            Edit {selectedCompany.name}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default CompanyList;
