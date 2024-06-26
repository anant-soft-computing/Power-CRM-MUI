import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Card, CardContent } from "@mui/material";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import SiteReport from "./SiteReport";
import QuoteReport from "./QuoteReport";
import RecentSites from "./RecentSites";
import ajaxCall from "../../helpers/ajaxCall";

const Dashboard = () => {
  const [siteData, setSiteData] = useState([]);
  const [quoteData, setQuoteData] = useState();
  const [companyData, setCompanyData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      setIsLoading(true);
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
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData("sites/get/site/latest/", setSiteData);
    fetchData("quote/generate-quote-latest/", setQuoteData);
    fetchData("company/", setCompanyData);
  }, []);
  return (
    <Container>
      <Typography variant="h5" mt={10}>
        Dashboard
      </Typography>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Card sx={{ mr: 3, width: 380 }}>
          <CardContent>
            <Typography variant="h6">Site</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                <AccountTreeRoundedIcon fontSize="large" />
              </Typography>
              <Typography variant="h5">{siteData?.length}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mr: 3, width: 380 }}>
          <CardContent>
            <Typography variant="h6">Company</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                <ApartmentRoundedIcon fontSize="large" />
              </Typography>
              <Typography variant="h5">{companyData?.length}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mr: 3, width: 380 }}>
          <CardContent>
            <Typography variant="h6">Quote</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                <FormatQuoteRoundedIcon fontSize="large" />
              </Typography>
              <Typography variant="h5">{quoteData?.length}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
        <SiteReport />
        <QuoteReport />
      </Box>
      <RecentSites siteData={siteData} isLoading={isLoading} />
    </Container>
  );
};

export default Dashboard;
