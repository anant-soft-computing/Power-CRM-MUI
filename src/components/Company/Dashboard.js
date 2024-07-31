import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  Container,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ajaxCall from "../../helpers/ajaxCall";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "../../css/custom.css";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

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
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [siteId, setSiteId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState({});
  const [companySites, setCompanySites] = useState([]);
  const [siteQuotes, setSiteQuotes] = useState([]);
  const [showQuote, setShowQuote] = useState(false);
  const [quoteData, setQuoteData] = useState([]);
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
    setIsLoading(true);
    fetchData(`company/${companyId}/`, setCompanyData);
    fetchData(`sites/get/site/?company=${companyId}`, setCompanySites).finally(
      () => setIsLoading(false)
    );
  }, [companyId]);

  useEffect(() => {
    fetchData("supplierdatagetview", setSiteQuotes);
  }, []);

  const handleViewQuotes = (data) => {
    setSiteId(data);
    setShowQuote(true);
  };

  const handleGenerateQuote = (data) => {
    navigate("/Quotes", { state: data });
  };

  const handleSiteid = (siteId) => {
    navigate("/Sites", { state: siteId });
  };

  useEffect(() => {
    fetchData("supplierdatagetview/", setQuoteData);
  }, []);

  useEffect(() => {
    fetchData("company/", setCompanyData);
  }, []);

  const columns = [
    { field: "site_name", headerName: "Site Name", width: 190 },
    { field: "owner_name", headerName: "Owner Name", width: 190 },
    {
      field: "company.name",
      headerName: "Company",
      width: 200,
      renderCell: (params) => params.row.company.name,
    },
    { field: "lead_type", headerName: "Lead Type", width: 190 },
    {
      field: "View Quote",
      headerName: "View Quote",
      width: 190,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewQuotes(params.row.id)}
        >
          <RemoveRedEyeIcon sx={{ mr: 1 }} />
          View Quote
        </Button>
      ),
    },
    // {
    //   field: "Generate Quote",
    //   headerName: "Generate Quote",
    //   width: 200,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={() => setQuoteId(params.row.id)}
    //     >
    //       <AddIcon />
    //       Generate Quote
    //     </Button>
    //   ),
    // },
    {
      field: "Send Quote",
      headerName: "Send Quote",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/Test/${params.row.id}`)}
        >
          Send Quotation
        </Button>
      ),
    },
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 10 }}>
        <Breadcrumb
          title={companyData?.name}
          middle="Company"
          middleUrl="Companies"
          main="Dashboard"
        />
        <Card sx={{ p: 2, m: 2, boxShadow: 5, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="company dashboard tabs"
            >
              <Tab label="Site" />
            </Tabs>

            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                onClick={() => handleGenerateQuote(companyId)}
              >
                <AddIcon sx={{ mr: 1 }} />
                Generate Quote
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSiteid(companyId)}
              >
                <AddIcon sx={{ mr: 1 }} />
                Add Site
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              value === 0 && (
                <>
                  {companySites.length > 0 ? (
                    <Box sx={{ height: "100%", width: "100%" }}>
                      <DataGrid
                        rows={companySites}
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
                </>
              )
            )}
          </Box>
        </Card>
      </Container>
      <Dialog
        open={showQuote}
        onClose={() => setShowQuote(false)}
        maxWidth="xl"
      >
        <DialogTitle>Quotes</DialogTitle>
        <DialogContent>
          {quotes.length > 0 ? (
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={quotes}
                columns={quotesColumns}
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
              align="center"
              variant="h6"
              component="div"
            >
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
