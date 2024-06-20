import React, { useState, useEffect } from "react";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { TextField, Box, IconButton, Tooltip, Container } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const CompanyDataTable = ({ onAddSite, onEditCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "parent_company", headerName: "Parent Company", width: 200 },
    { field: "reference", headerName: "Reference", width: 200 },
    { field: "number_of_employees", headerName: "Employees", width: 150 },
    { field: "registrationNo", headerName: "Registration No", width: 200 },
    {
      field: "estimated_turnover",
      headerName: "Estimated Turnover",
      width: 200,
    },
    { field: "business_type", headerName: "Business Type", width: 200 },
    { field: "is_macro_business", headerName: "Is Macro Business", width: 150 },
    { field: "addressline1_company", headerName: "Address Line 1", width: 200 },
    { field: "addressline2_company", headerName: "Address Line 2", width: 200 },
    { field: "addressline3_company", headerName: "Address Line 3", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 150 },
    { field: "country_of_company", headerName: "Country", width: 200 },
    { field: "account_name", headerName: "Account Name", width: 200 },
    { field: "bank_name", headerName: "Bank Name", width: 200 },
    { field: "account_no", headerName: "Account No", width: 200 },
    { field: "shortcode", headerName: "Shortcode", width: 200 },
    { field: "sic_code", headerName: "SIC Code", width: 200 },
    { field: "partner_name", headerName: "Partner Name", width: 200 },
    { field: "partner_dob", headerName: "Partner DOB", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "home_post_code", headerName: "Home Post Code", width: 200 },
    {
      field: "time_at_address_months",
      headerName: "Time at Address (Months)",
      width: 200,
    },
    {
      field: "time_at_address_years",
      headerName: "Time at Address (Years)",
      width: 200,
    },
    { field: "first_name", headerName: "First Name", width: 200 },
    { field: "last_name", headerName: "Last Name", width: 200 },
    { field: "contact_title", headerName: "Contact Title", width: 200 },
    { field: "position", headerName: "Position", width: 200 },
    { field: "telephone_number", headerName: "Telephone Number", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Create Site">
            <IconButton onClick={() => onAddSite(params.row)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Company">
            <IconButton onClick={() => onEditCompany(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container>
      <Box sx={{ height: 600 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          sx={{ mb: 2 }}
        />
        <DataGrid
          rows={filteredCompanies}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}

        />
      </Box>
    </Container>
  );
};



export default CompanyDataTable;
