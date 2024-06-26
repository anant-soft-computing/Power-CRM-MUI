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
import ajaxCall from "../../helpers/ajaxCall";

const quotesColumns = [
  { headerName: "Supplier", field: "supplier", filter: true },
  { headerName: "Term", field: "term", filter: true },
  { headerName: "Day Rate (pence/kWh)", field: "day_rate", filter: true },
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
  { headerName: "Up Lift", field: "up_lift", filter: true },
];

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const [value, setValue] = useState(0);
  const [siteId, setSiteId] = useState(0);
  const [companySites, setCompanySites] = useState([]);
  const [siteQuotes, setSiteQuotes] = useState([]);
  const [showQuote, setShowQuote] = useState(false);

  const quotes = siteQuotes.filter((item) => item.site === siteId);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    fetchData(`sites/get/site/?company=${companyId}`, setCompanySites);
  }, [companyId]);

  useEffect(() => {
    fetchData("supplierdatagetview", setSiteQuotes);
  }, []);

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
        <Container component="main" sx={{ marginTop: 1, width: "100%" }}>
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
                {value === 0 && companySites.length > 0 ? (
                  <DataGrid rows={companySites} columns={columns} />
                ) : (
                  <Typography variant="h5" component="div">
                    No Sites Available !!
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
      <Dialog open={showQuote} onClose={() => setShowQuote(false)} maxWidth>
        <DialogTitle>Quotes</DialogTitle>
        <DialogContent>
          {quotes.length > 0 ? (
            <DataGrid rows={quotes} columns={quotesColumns} />
          ) : (
            <Typography variant="h5" component="div">
              No Quotes Available !!
            </Typography>
          )}
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