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
  const [CompanyDocument, setCompanyDocument] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
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
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  useEffect(() => {
    fetchData(`company-document/`, setCompanyDocument);
  }, []);

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
      width: 120,
    },
    {
      headerName: "Company Document",
      field: "CompanyDocument",
      width: 190,
      renderCell: (params) => {
        const document = CompanyDocument.find(
          (doc) => doc.company === params.row.id
        );
        return document ? (
          <Button href={document.document} variant="contained" color="primary">
            {"View Document"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/CompanyDocument/${params.row.id}`)}
          >
            Add Documents
          </Button>
        );
      },
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Companies" main="Dashboard" />

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
