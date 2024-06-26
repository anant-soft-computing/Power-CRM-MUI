import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";

const SiteDataTable = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "sites/get/site/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setSiteData(response?.data);
          setIsLoading(false);
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  const columns = [
    {
      field: "site_name",
      headerName: "Site Name",
      width: 200,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => navigate(`/Site/${params.row.id}`)}
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
      {isLoading ? (
        <CircularProgress />
      ) : siteData.length > 0 ? (
        <DataGrid rows={siteData} columns={columns} />
      ) : (
        <Typography variant="h5" component="div">
          No Sites Available !!
        </Typography>
      )}
    </Container>
  );
};

export default SiteDataTable;
