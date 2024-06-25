import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Toolbar,
  Card,
  Container,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const quotesColumns = [
  {
    headerName: "Supplier",
    field: "supplier",
    filter: true,
  },
  {
    headerName: "Term",
    field: "term",
    filter: true,
  },
  {
    headerName: "Day Rate (pence/kWh)",
    field: "day_rate",
    filter: true,
  },
  {
    headerName: "Night Rate (pence/kWh)",
    field: "night_rate",
    filter: true,
    width: 210,
  },
  {
    headerName: "Standing Charge (pence)",
    field: "standing_charge",
    filter: true,
    width: 210,
  },
  {
    headerName: "Up Lift",
    field: "up_lift",
    filter: true,
  },
];

const CompanyDashboard = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [siteId, setSiteId] = useState(0);
  const [siteData, setSiteData] = useState([]);
  const [siteQuotes, setSiteQuotes] = useState([]);
  const [showQuote, setShowQuote] = useState(false);

  const quotes = siteQuotes.filter((item) => item.site === siteId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://aumhealthresort.com/powercrm/api/sites/get/site/?company=${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSiteData(data);
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://aumhealthresort.com/powercrm/api/supplierdatagetview/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSiteQuotes(data);
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, [id]);

  const handleViewQuotes = (data) => {
    setSiteId(data);
    setShowQuote(true);
  };

  const columns = [
    { field: "site_name", headerName: "Site Name", width: 200 },
    { field: "owner_name", headerName: "Owner Name", width: 200 },
    {
      field: "company.name",
      headerName: "Company",
      width: 200,
      renderCell: (params) => params.row.company.name,
    },
    { field: "lead_type", headerName: "Lead Type", width: 200 },
    {
      field: "View Quote",
      headerName: "View Quote",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewQuotes(params.row.id)}
          sx={{ m: 1 }}
        >
          View Quote
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Container
          component="main"
          sx={{
            marginTop: 1,
            width: "100%",
          }}
        >
          <Toolbar />
          <Typography variant="h5" gutterBottom>
            Company Dashboard
          </Typography>
          <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="company dashboard tabs"
              >
                <Tab label="Site" />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {value === 0 && <DataGrid rows={siteData} columns={columns} />}
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
      <Dialog open={showQuote} onClose={() => setShowQuote(false)} maxWidth>
        <DialogTitle>Quotes</DialogTitle>
        <DialogContent>
          <DataGrid rows={quotes} columns={quotesColumns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuote(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyDashboard;