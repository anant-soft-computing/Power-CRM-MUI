import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Card,
  Button,
  CircularProgress,
  CardContent,
} from "@mui/material";
import AddSite from "./AddSite";
import ajaxCall from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";

const Site = () => {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [CompanyData, setCompanyData] = useState([]);
  const [ContactData, setContactData] = useState([]);
  const [loaData, setloaData] = useState([]);

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
    {
      headerName: "Email",
      field: "contacts.email",
      renderCell: (params) => params.row.contacts.email,
      width: 250,
    },
  ];

  useEffect(() => {
    fetchCompanies();
    fetchSupportContact();
    fetchLoaData();
  }, []);

  const fetchData = async (url, setter, showNoDataMessage = true) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data.length === 0 && showNoDataMessage) {
          console.log("--------->");
        } else {
          setter(data);
        }
      } else if (response.status === 500) {
        console.log("----error----->");
      } else {
        setter([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCompanies = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/company/",
      setCompanyData,
      true
    );
  const fetchSupportContact = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/support_contact/",
      setContactData,
      true
    );

  const fetchLoaData = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/loa_template/",
      setloaData,
      true
    );

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Typography variant="h5">Sites</Typography>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Card sx={{ boxShadow: 5 }}>
          <AddSite
            companyData={CompanyData}
            contactData={ContactData}
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
              No Sites Available !!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Site;
