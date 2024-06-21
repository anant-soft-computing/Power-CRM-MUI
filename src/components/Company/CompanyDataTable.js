import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
} from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";
import axios from "axios";

const CompanyDataTable = ({ onCompanyClick, onAddSite, onEditCompany }) => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);


  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    axios
      .get("/api/companies")
      .then((response) => {
        setCompanies(response.data);
        setFilteredCompanies(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the companies!", error);
      });
  }, []);

  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, companies]);



  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'parent_company', headerName: 'Parent Company', width: 150 },
    { field: 'number_of_employees', headerName: 'Number of Employees', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleNavigation('/sites')} sx={{ m: 1 }}>Add Site</Button>
          <Button variant="contained" color="secondary" onClick={() => handleNavigation('/company')}>Edit</Button>
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, name: 'Company A', parent_company: 'Parent A', number_of_employees: 100 },
    { id: 2, name: 'Company B', parent_company: 'Parent B', number_of_employees: 200 },
  ];

  return (
    <Container>
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      </Box>
    </Container>
  );
};

export default CompanyDataTable;
