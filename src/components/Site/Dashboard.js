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
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [siteData, setSiteData] = useState({});
  const [siteQuotes, setSiteQuotes] = useState([]);

  const quotes = siteQuotes.filter((item) => item.site === parseInt(id));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://aumhealthresort.com/powercrm/api/sites/update/site/${id}/`,
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
              {value === 0 && <DataGrid rows={quotes} columns={columns} />}
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
