import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SiteDataTable = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSitesData();
  }, []);

  const fetchData = async (url, setter, showNoDataMessage = true) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0 && showNoDataMessage) {
          console.log("No data found");
        } else {
          setter(data);
        }
      } else {
        console.error(`Error fetching data: ${response.status}`);
        setter([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const fetchSitesData = () => {
    const url = "https://aumhealthresort.com/powercrm/api/sites/get/site/";
    fetchData(url, setSites);
  };

  const onSiteClick = (companyId) => {
    navigate(`/SiteDashboard/${companyId}`);
  };

  const columns = [
    {
      field: "site_name",
      headerName: "Site Name",
      width: 200,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => onSiteClick(params.row.id)}
          sx={{ textTransform: "none" }}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "owner_name", headerName: "Owner Name", width: 200 },
    {
      field: "company.name",
      headerName: "Company",
      width: 200,
      renderCell: (params) => params.row.company.name,
    },
    {
      field: "current_gas_and_electricity_supplier_details",
      headerName: "Supplier Details",
      width: 250,
    },
    { field: "tenant", headerName: "Tenant", width: 100 },
    { field: "vacant", headerName: "Vacant", width: 100 },
    { field: "change_of_tenancy", headerName: "Change of Tenancy", width: 150 },
    { field: "customer_consent", headerName: "Customer Consent", width: 150 },
    { field: "notes", headerName: "Notes", width: 300 },
    { field: "lead_type", headerName: "Lead Type", width: 200 },
    { field: "bill_to_sent", headerName: "Bill To Sent", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  return (
    <Container>
      <DataGrid
        rows={sites}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Container>
  );
};

export default SiteDataTable;
