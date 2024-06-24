import React, { useState, useEffect } from "react";
import { Typography, Box, Container, Toolbar, Card } from "@mui/material";
import SiteDataTable from "./SiteDataTable";
import AddSite from "./AddSite";

const SiteList = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [errs, setErrs] = useState("");

  const [CompanyData, setCompanyData] = useState([]);
  const [ContactData, setContactData] = useState([]);
  const [loaData, setloaData] = useState([]);

  const handleEditSite = (site) => {
    setSelectedSite(site);
  };

  const handleCreateQuote = (site) => {
    setSelectedSite(site);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchEnquiries(token);
    fetchSupportContact();
    fetchLoaData();
  }, []);

  const fetchData = async (
    url,
    setter,
    errorMessage,
    showNoDataMessage = true
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data.length === 0 && showNoDataMessage) {
          setErrs(errorMessage);
        } else {
          setter(data);
        }
      } else if (response.status === 500) {
        setErrs(errorMessage);
      } else {
        setter([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchEnquiries = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/company/",
      setCompanyData,
      "No Company Data found",
      true
    );
  const fetchSupportContact = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/support_contact/",
      setContactData,
      "No Company Data found",
      true
    );

  const fetchLoaData = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/loa_template/",
      setloaData,
      "No LOA Data found",
      true
    );

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
          Sites
        </Typography>
        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box>
            <AddSite
              CompanyData={CompanyData}
              ContactData={ContactData}
              loaData={loaData}
            />
          </Box>
        </Card>
        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box>
            <SiteDataTable
              onEditSite={handleEditSite}
              onCreateQuote={handleCreateQuote}
            />
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default SiteList;
