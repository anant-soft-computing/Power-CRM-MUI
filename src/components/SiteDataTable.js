import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { TextField, Box, IconButton, Tooltip } from "@mui/material";
import {
  Edit as EditIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import axios from "axios";

const SiteDataTable = ({ onEditSite, onCreateQuote }) => {
  const [sites, setSites] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredSites, setFilteredSites] = useState([]);

  useEffect(() => {
    axios
      .get("/api/sites")
      .then((response) => {
        setSites(response.data);
        setFilteredSites(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the sites!", error);
      });
  }, []);

  useEffect(() => {
    setFilteredSites(
      sites.filter((site) =>
        site.site_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, sites]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: "site_name", headerName: "Site Name", width: 200 },
    { field: "company", headerName: "Company", width: 200 },
    { field: "owner_name", headerName: "Owner Name", width: 200 },
    {
      field: "current_gas_and_electricity_supplier_details",
      headerName: "Supplier Details",
      width: 250,
    },
    { field: "tenant", headerName: "Tenant", width: 100 },
    { field: "vacant", headerName: "Vacant", width: 100 },
    { field: "change_of_tenancy", headerName: "Change of Tenancy", width: 150 },
    { field: "customer_consent", headerName: "Customer Consent", width: 150 },
    { field: "mpan_id", headerName: "MPAN ID", width: 200 },
    { field: "siteAddressLine1", headerName: "Address Line 1", width: 200 },
    { field: "siteAddressLine2", headerName: "Address Line 2", width: 200 },
    { field: "siteAddressLine3", headerName: "Address Line 3", width: 200 },
    { field: "siteAddressLine4", headerName: "Address Line 4", width: 200 },
    { field: "siteCountry", headerName: "Country", width: 200 },
    { field: "sitePostCode", headerName: "Post Code", width: 150 },
    {
      field: "isBillingSiteSame",
      headerName: "Billing Same as Site",
      width: 150,
    },
    {
      field: "billingAddressLine1",
      headerName: "Billing Address Line 1",
      width: 200,
    },
    {
      field: "billingAddressLine2",
      headerName: "Billing Address Line 2",
      width: 200,
    },
    {
      field: "billingAddressLine3",
      headerName: "Billing Address Line 3",
      width: 200,
    },
    {
      field: "billingAddressLine4",
      headerName: "Billing Address Line 4",
      width: 200,
    },
    { field: "billingCountry", headerName: "Billing Country", width: 200 },
    { field: "billingPostCode", headerName: "Billing Post Code", width: 150 },
    { field: "site_reference", headerName: "Site Reference", width: 200 },
    { field: "support_contact", headerName: "Support Contact", width: 200 },
    { field: "lead_source", headerName: "Lead Source", width: 200 },
    { field: "notes", headerName: "Notes", width: 300 },
    { field: "lead_type", headerName: "Lead Type", width: 200 },
    { field: "bill_to_sent", headerName: "Bill To Sent", width: 150 },
    {
      field: "welcome_letter_send",
      headerName: "Welcome Letter Sent",
      width: 150,
    },
    { field: "first_name", headerName: "First Name", width: 200 },
    { field: "last_name", headerName: "Last Name", width: 200 },
    { field: "contact_title", headerName: "Contact Title", width: 200 },
    { field: "position", headerName: "Position", width: 200 },
    { field: "telephone_number", headerName: "Telephone Number", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "agent_email", headerName: "Agent Email", width: 200 },
    { field: "loa_header_to_use", headerName: "LOA Header", width: 200 },
    { field: "loa_template", headerName: "LOA Template", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit Site">
            <IconButton onClick={() => onEditSite(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create Quote">
            <IconButton onClick={() => onCreateQuote(params.row)}>
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={filteredSites}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

function GridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default SiteDataTable;
