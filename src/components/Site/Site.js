import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Container,
  Card,
  Button,
  CircularProgress,
  CardContent,
  Tooltip,
} from "@mui/material";
import AddSite from "./AddSite";
import ajaxCall from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import "../../css/custom.css";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

const Site = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  const [contactData, setContactData] = useState([]);

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  const fetchData = useCallback(async (endpoint, setData) => {
    try {
      const response = await ajaxCall(
        endpoint,
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
        setData(response?.data);
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchData("sites/get/site/", setSiteData).finally(() =>
      setIsLoading(false)
    );
    fetchData("company/", setCompanyData);
    fetchData("sites/get/support_contact/", setContactData);
  }, [fetchData, refreshTable]);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "Actions",
      field: "actions",
      width: 140,
      renderCell: () => (
        <>
          <Tooltip title="Add Follow Ups" arrow>
            <FollowTheSignsIcon
              sx={{ m: 1 }}
              color="primary"
              fontSize="medium"
            />
          </Tooltip>
          <Tooltip title="Add Notes" arrow>
            <SpeakerNotesIcon sx={{ m: 1 }} color="primary" fontSize="medium" />
          </Tooltip>
          <Tooltip title="Add Quote" arrow>
            <FormatQuoteIcon
              sx={{ m: 1 }}
              color="primary"
              fontSize="medium"
              onClick={() => navigate("/Quotes")}
            />
          </Tooltip>
        </>
      ),
    },
    {
      headerName: "Site Name",
      field: "site_name",
      width: 200,
      renderCell: (params) => (
        <Tooltip
          title={
            <Box>
              {params.row.lead_type && (
                <Typography variant="body2">
                  Lead Type : {params.row.lead_type}
                </Typography>
              )}
              {params.row.current_gas_and_electricity_supplier_details && (
                <Typography variant="body2">
                  Supplier Details :{" "}
                  {params.row.current_gas_and_electricity_supplier_details}
                </Typography>
              )}
            </Box>
          }
          arrow
        >
          <Button
            color="primary"
            onClick={() => navigate(`/Site/${params.row.id}`)}
            sx={{ textTransform: "none" }}
          >
            {params.value}
          </Button>
        </Tooltip>
      ),
    },
    {
      headerName: "Company",
      field: "company.name",
      width: 200,
      renderCell: (params) => params.row.company.name,
    },
    {
      headerName: "Supplier Details",
      field: "current_gas_and_electricity_supplier_details",
      width: 250,
    },
    {
      headerName: "Phone No",
      field: "contacts.telephone_number",
      renderCell: (params) => params.row.contacts.telephone_number,
      width: 130,
    },
    {
      headerName: "Email",
      field: "contacts.email",
      renderCell: (params) => params.row.contacts.email,
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
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Sites" main="Dashboard" />
      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : siteData.length > 0 ? (
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={siteData}
                columns={columns}
                disableColumnFilter
                disableDensitySelector
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "evenRow"
                    : "oddRow"
                }
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
              />
            </Box>
          ) : (
            <Typography
              color="error"
              sx={{ mt: 2 }}
              align="center"
              variant="h6"
              component="div"
            >
              No Sites Available !!
            </Typography>
          )}
        </CardContent>
      </Card>
      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <AddSite
          companyData={companyData}
          contactData={contactData}
          refreshTableMode={refreshTableMode}
        />
      </Card>
    </Container>
  );
};

export default Site;
