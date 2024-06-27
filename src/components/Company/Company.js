import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Typography,
  Card,
  Container,
  Button,
  CircularProgress,
  Box,
  CardContent,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddCompany from "./AddCompany";
import ajaxCall from "../../helpers/ajaxCall";
import "../../css/custom.css";

const Company = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTableMode = () => {
    setRefreshTable((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "company/",
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
          setCompanyData(response?.data);
          setIsLoading(false);
        } else {
          toast.error("Some Problem Occurred. Please try again.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [refreshTable]);

  const columns = [
    {
      headerName: "Name",
      field: "name",
      width: 250,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => navigate(`/Company/${params.row.id}`)}
        >
          {params.value}
        </Button>
      ),
    },
    { headerName: "Parent Company", field: "parent_company", width: 200 },
    {
      headerName: "Postcode",
      field: "postcode",
      width: 120,
    },
    {
      headerName: "Reference",
      field: "reference",
      width: 200,
    },
    {
      headerName: "Registration No",
      field: "registration_no",
      width: 150,
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
      headerName: "Time of The Months",
      field: "time_at_address_months",
    },
    {
      headerName: "Time of The Years",
      field: "time_at_address_years",
    },
    {
      headerName: "Actions",
      field: "actions",
      width: 440,
      renderCell: () => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/Sites")}
            sx={{ m: 1 }}
          >
            Add Site
          </Button>
          <Button variant="contained" color="primary" sx={{ m: 1 }}>
            Add Follow Ups
          </Button>
          <Button variant="contained" color="primary">
            Add Notes
          </Button>
        </>
      ),
    },
  ];
  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Typography variant="h5">Company</Typography>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Card sx={{ boxShadow: 5 }}>
          <AddCompany refreshTableMode={refreshTableMode} />
        </Card>
      </Box>

      <Card sx={{ mt: 3, boxShadow: 5 }}>
        <CardContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : companyData.length > 0 ? (
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={companyData}
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
              No Company Available !!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Company;
