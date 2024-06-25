import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const CompanyDataTable = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchCompanyData(token);
  }, []);

  const fetchData = async (url, setter, showNoDataMessage = true) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data.length === 0 && showNoDataMessage) {
          console.log("------->");
        } else {
          setter(data);
        }
      } else if (response.status === 500) {
        console.log("---error---->");
      } else {
        setter([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCompanyData = (token) => {
    fetchData(
      "https://aumhealthresort.com/powercrm/api/company/",
      setCompanies,
      true
    );
  };

  const onCompanyClick = (companyId) => {
    navigate(`/CompanyDashboard/${companyId}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <Button
          color="primary"
          onClick={() => onCompanyClick(params.row.id)}
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
          onClick={() => navigate("/sites")}
          sx={{ m: 1 }}
        >
          Add Site
        </Button>
      ),
    },
  ];

  return <DataGrid rows={companies} columns={columns} />;
};

export default CompanyDataTable;
