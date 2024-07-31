import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import { DataGrid } from "@mui/x-data-grid";
import "../../css/custom.css";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

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
  {
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
      >
        Accept
      </Button>
    ),
  },
];

const Test = () => {
  const params = useParams();
  const [quoteData, setQuoteData] = useState([]);

  const filteredQuoteData = quoteData.filter(
    (item) => item.site == params.siteId
  );

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
    fetchData("supplierdatagetview/", setQuoteData);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Navbar />
      {filteredQuoteData.length > 0 ? (
        <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={filteredQuoteData}
                columns={columns}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "evenRow"
                    : "oddRow"
                }
              />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography
          color="error"
          sx={{ mt: 4 }}
          align="center"
          variant="h6"
          component="div"
        >
          No Quotes Available !!
        </Typography>
      )}
      {/* 
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 3 }}>
        <Button variant="contained" color="primary" sx={{ m: 1 }}>
          Save
        </Button>
        <Button variant="contained" color="primary" sx={{ m: 1 }}>
          Save & Send
        </Button>
      </Box> */}
    </Container>
  );
};

export default Test;
