import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
} from "@mui/material";
import GenerateQuote from "./GenerateQuote";
import ajaxCall from "../../helpers/ajaxCall";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../../css/custom.css";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

const columns = [
  { headerName: "Supplier", field: "supplier", width: 180 },
  { headerName: "Term", field: "term", width: 150 },
  { headerName: "Day Rate (pence/kWh)", field: "day_rate", width: 180 },
  { headerName: "Night Rate (pence/kWh)", field: "night_rate", width: 180 },
  {
    headerName: "Standing Charge (pence)",
    field: "standing_charge",
    width: 180,
  },
  { headerName: "Up Lift", field: "up_lift", width: 150 },
];

const Quote = () => {
  const [site, setSite] = useState("");
  const [siteData, setSiteData] = useState([]);
  const [quoteData, setQuoteData] = useState([]);

  const filteredQuoteData = quoteData.filter((item) => item.site === site);

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
    fetchData(`sites/get/site/`, setSiteData);
  }, []);

  useEffect(() => {
    fetchData("supplierdatagetview/", setQuoteData);
  }, []);

  const handleSiteChange = (e) => {
    setSite(e.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Quotes" main="Dashboard" />
    
        <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
          <GenerateQuote />
        </Card>
      

      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <Grid container m={2}>
          <Grid item xs={3} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="site-label">Site Name</InputLabel>
              <Select
                labelId="site-label"
                label="Site Name"
                name="site_name"
                value={site}
                onChange={handleSiteChange}
              >
                {siteData.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.site_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <CardContent>
          {filteredQuoteData.length > 0 ? (
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={filteredQuoteData}
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
          ) : site === "" ? (
            <Typography
              color="error"
              sx={{ mt: 2 }}
              align="center"
              variant="h6"
              component="div"
            >
              Please Select Site For Quotes
            </Typography>
          ) : (
            <Typography
              color="error"
              sx={{ mt: 2 }}
              align="center"
              variant="h6"
              component="div"
            >
              No Quotation Available !!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Quote;
