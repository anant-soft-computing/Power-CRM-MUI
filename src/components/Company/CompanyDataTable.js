import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
} from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";

const CompanyDataTable = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [errs, setErrs] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchCompanyData(token);
  }, []);

  const fetchData = async (url, setter, errorMessage, showNoDataMessage = true) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data.length === 0 && showNoDataMessage) {
          setErrs(errorMessage);
        } else {
          setter(data);
        }
      } else if (response.status === 500) {
        setErrs(errorMessage);
      } else {
        setter([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCompanyData = (token) => {
    fetchData(
      "https://aumhealthresort.com/powercrm/api/company/",
      setCompanies,
      "No Company Data found",
      true
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCompanyClick = (companyId) => {
    handleNavigation(`/companyDashboard/${companyId}`);
  };

  useEffect(() => {
    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, companies]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name', headerName: 'Name', width: 150,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => handleCompanyClick(params.row.id)}
          sx={{ textTransform: 'none' }}
        >
          {params.value}
        </Button>
      )
    },
    { field: 'parent_company', headerName: 'Parent Company', width: 150 },
    { field: 'number_of_employees', headerName: 'Number of Employees', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: () => (
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleNavigation('/sites')} sx={{ m: 1 }}>Add Site</Button>
          <Button variant="contained" color="secondary" onClick={() => handleNavigation('/company')}>Edit</Button>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={filteredCompanies}
          columns={columns}
          pageSize={5}
        />
      </Box>
    </Container>
  );
};

export default CompanyDataTable;
