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
  Tooltip,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddCompany from "./AddCompany";
import ajaxCall from "../../helpers/ajaxCall";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import "../../css/custom.css";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

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
      headerName: "Actions",
      field: "actions",
      width: 140,
      renderCell: () => (
        <>
          <Tooltip title="Add Site" arrow>
            <AccountTreeIcon
              sx={{ m: 1 }}
              color="primary"
              fontSize="medium"
              onClick={() => navigate("/Sites")}
            />
          </Tooltip>
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
        </>
      ),
    },
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
  ];
  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Company" main="Dashboard" />

      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <AddCompany refreshTableMode={refreshTableMode} />
      </Card>

      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : companyData.length > 0 ? (
            <Box sx={{ height: "100%", width: "100%" }}>
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