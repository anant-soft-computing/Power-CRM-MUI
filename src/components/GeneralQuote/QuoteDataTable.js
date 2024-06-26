import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ajaxCall from "../../helpers/ajaxCall";

const columns = [
  { headerName: "Supplier", field: "supplier" },
  { headerName: "Term", field: "term" },
  { headerName: "Day Rate (pence/kWh)", field: "day_rate" },
  { headerName: "Night Rate (pence/kWh)", field: "night_rate" },
  { headerName: "Standing Charge (pence)", field: "standing_charge" },
  { headerName: "Up Lift", field: "up_lift" },
];

const QuoteDataTable = () => {
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
    <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={6}>
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
      <Card>
        {filteredQuoteData.length > 0 ? (
          <DataGrid rows={filteredQuoteData} columns={columns} />
        ) : (
          <Typography variant="h5" component="div">
            No Quotes Data Available !!
          </Typography>
        )}
      </Card>
    </Card>
  );
};

export default QuoteDataTable;
