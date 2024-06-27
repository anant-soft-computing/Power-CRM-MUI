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
import "../../css/custom.css";

const Site = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [loaData, setLoaData] = useState([]);

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
    fetchData("sites/get/loa_template/", setLoaData);
  }, [fetchData]);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const columns = [
    {
      headerName: "Actions",
      field: "actions",
      width: 320,
      renderCell: () => (
        <>
          <Button variant="contained" color="primary" sx={{ m: 1 }}>
            Add Follow Ups
          </Button>
          <Button variant="contained" color="primary">
            Add Notes
          </Button>
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
      <Typography variant="h5">Sites</Typography>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Card sx={{ boxShadow: 5 }}>
          <AddSite
            companyData={companyData}
            contactData={contactData}
            loaData={loaData}
          />
        </Card>
      </Box>
      <Card sx={{ mt: 3, boxShadow: 5 }}>
        <CardContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : siteData.length > 0 ? (
            <Box sx={{ height: 400, width: "100%" }}>
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
    </Container>
  );
};

export default Site;
