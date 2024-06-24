import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

function createData(name, owner, company, email) {
  return { name, owner, company, email };
}


const rows = [
  createData("GIDC", "Owner1", "Company1", "owner1@company1.com"),
  createData("GSFC", "Owner2", "Company2", "owner2@company2.com"),
];

function RecentSites() {


  const [RecentSites, setRecentSites] = useState([]);

  const [errs, setErrs] = useState("");
  const theme = useTheme();

  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchRecentSitesData(token);
  }, []);


  const fetchData = async (url, setter, errorMessage, showNoDataMessage = true) => {
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
          setErrs(errorMessage);
        } else {
          setter(data);
        }
      } else if (response.status === 500) {
        setErrs(errorMessage);
      } else {
        setter([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchRecentSitesData = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/site/latest/",
      setRecentSites,
      "No Company Data found",
      true
    );

  const columns = [
    { field: "site_name", headerName: "Site Name", width: 200 },
    { field: "type_of_owner", headerName: "Company", width: 200 },
    { field: "owner_name  ", headerName: "Owner Name", width: 200 },
    {
      field: "company",
      headerName: "Company",
      width: 250,
    },
    { field: "", headerName: "Agent Email", width: 100 },

  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Recent Sites
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <DataGrid
                rows={RecentSites}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
              />
            </TableHead>

          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleNavigation('/sites')}>
          Create Site
        </Button>
      </CardContent>
    </Card>
  );
}

export default RecentSites;
