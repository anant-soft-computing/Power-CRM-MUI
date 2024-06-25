import React, { useState, useEffect } from "react";
import { Typography, Box, Container, Toolbar, Card } from "@mui/material";
import SiteDataTable from "./SiteDataTable";
import AddSite from "./AddSite";

const Site = () => {
  const [CompanyData, setCompanyData] = useState([]);
  const [ContactData, setContactData] = useState([]);
  const [loaData, setloaData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchEnquiries(token);
    fetchSupportContact();
    fetchLoaData();
  }, []);

  const fetchData = async (url, setter, showNoDataMessage = true) => {
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
          console.log("--------->");
        } else {
          setter(data);
        }
      } else if (response.status === 500) {
        console.log("----error----->");
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

      true
    );
  const fetchSupportContact = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/support_contact/",
      setContactData,
      true
    );

  const fetchLoaData = () =>
    fetchData(
      "https://aumhealthresort.com/powercrm/api/sites/get/loa_template/",
      setloaData,
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
          <AddSite
            companyData={CompanyData}
            contactData={ContactData}
            loaData={loaData}
          />
        </Card>
        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <SiteDataTable />
        </Card>
      </Container>
    </Box>
  );
};

export default Site;
