import {
  Box,
  Card,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplyDetails from "./Supply Details/SupplyDetails";
import ajaxCall from "../../helpers/ajaxCall";

const columns = [
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

const SiteDashboard = () => {
  const { siteId } = useParams();
  const [value, setValue] = useState(0);
  const [siteData, setSiteData] = useState({});
  const [siteQuotes, setSiteQuotes] = useState([]);

  const quotes = siteQuotes.filter((item) => item.site === parseInt(siteId));

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
    fetchData(`sites/update/site/${siteId}/`, setSiteData);
  }, [siteId]);

  useEffect(() => {
    fetchData("supplierdatagetview", setSiteQuotes);
  }, []);

  return (
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
          Site Dashboard
        </Typography>
        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="company dashboard tabs"
            >
              <Tab label="Site" />
              <Tab label="Quotes" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {value === 0 && quotes.length > 0 ? (
                <DataGrid rows={quotes} columns={columns} />
              ) : (
                <Typography
                  color="error"
                  sx={{ mt: 2 }}
                  align="center"
                  variant="h6"
                  component="div"
                >
                  No Quotes Available !!
                </Typography>
              )}
              {value === 1 && (
                <SupplyDetails
                  leadType={siteData.lead_type}
                  MpanID={siteData.mpan_id}
                />
              )}
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default SiteDashboard;
