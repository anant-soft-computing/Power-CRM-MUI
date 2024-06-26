import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";

const RecentSites = ({ siteData, isLoading }) => {
  const navigate = useNavigate();

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "Site Name",
      field: "site_name",
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
    {
      headerName: "Supplier Details",
      field: "current_gas_and_electricity_supplier_details",
      width: 250,
    },
    {
      headerName: "Tenant",
      field: "tenant",
      renderCell: renderItemAvailable,
      width: 100,
    },
    {
      headerName: "Vacant",
      field: "vacant",
      renderCell: renderItemAvailable,
      width: 100,
    },
    {
      headerName: "Change of Tenancy",
      field: "change_of_tenancy",
      renderCell: renderItemAvailable,
      width: 150,
    },
    {
      headerName: "Customer Consent",
      field: "customer_consent",
      renderCell: renderItemAvailable,
      width: 150,
    },
    {
      headerName: "Bill To Sent",
      field: "bill_to_sent",
      renderCell: renderItemAvailable,
      width: 150,
    },
    {
      headerName: "Lead Type",
      field: "lead_type",
      renderCell: renderItemAvailable,
      width: 200,
    },
  ];

  return (
    <Card sx={{ mt: 3, boxShadow: 5 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Recent Sites
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/Sites")}
          >
            Create Site
          </Button>
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : siteData.length > 0 ? (
          <Box sx={{ height: 400, width: "100%", mt: 2 }}>
            <DataGrid rows={siteData} columns={columns} />
          </Box>
        ) : (
          <Typography
            color="error"
            sx={{ mt: 2 }}
            align="center"
            variant="h6"
            component="div"
          >
            No Recent Sites Available !!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSites;
