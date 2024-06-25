import React from "react";
import { Typography, Card, Container } from "@mui/material";
import CompanyDataTable from "./CompanyDataTable";
import AddCompany from "./AddCompany";

const Company = () => {
  return (
    <Container component="main" sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Companies
      </Typography>
      <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
        <AddCompany />
      </Card>
      <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
        <CompanyDataTable />
      </Card>
    </Container>
  );
};

export default Company;
