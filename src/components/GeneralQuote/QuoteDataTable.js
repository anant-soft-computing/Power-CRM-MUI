import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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

  useEffect(() => {
    const fetchSiteData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://aumhealthresort.com/powercrm/api/sites/get/site/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setSiteData(data);
        } else {
          console.error("Error fetching site data:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSiteData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://aumhealthresort.com/powercrm/api/supplierdatagetview/",
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
          setQuoteData(data);
        } else {
          console.error("Error fetching quote data:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSiteChange = (e) => {
    setSite(e.target.value);
  };

  const filteredQuoteData = quoteData.filter((item) => item.site === site);

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
        <DataGrid
          rows={filteredQuoteData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Card>
    </Card>
  );
};

export default QuoteDataTable;
