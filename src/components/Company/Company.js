import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Typography,
  Card,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCompany from "./AddCompany";
import ajaxCall from "../../helpers/ajaxCall";

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
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => navigate(`/Company/${params.row.id}`)}
          sx={{ textTransform: "none" }}
        >
          {params.value}
        </Button>
      ),
    },
    { field: "parent_company", headerName: "Parent Company", width: 150 },
    {
      field: "number_of_employees",
      headerName: "Number of Employees",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: () => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/Sites")}
          sx={{ m: 1 }}
        >
          Add Site
        </Button>
      ),
    },
  ];
  return (
    <Container component="main" sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Companies
      </Typography>
      <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
        <AddCompany refreshTableMode={refreshTableMode} />
      </Card>
      <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
        {isLoading ? (
          <CircularProgress />
        ) : companyData.length > 0 ? (
          <DataGrid rows={companyData} columns={columns} />
        ) : (
          <Typography variant="h5" component="div">
            No Companies Available !!
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default Company;
