import React, { useState, useEffect } from "react";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Container,
  Button,
  MenuItem,
  Card,
} from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

const initialSiteData = {
  gName: "",
  sites: [],
  gType: "",
  company: "",
};

const MultiSite = () => {
  const [formData, setFormData] = useState(initialSiteData);
  const [siteData, setSiteData] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "sites" ? value : value,
    }));
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
    fetchData(`company/`, setCompanyData);
  }, []);

  useEffect(() => {
    fetchData(`sites/get/site/`, setSiteData);
  }, []);

  const CreateSiteDocument = async (e) => {
    e.preventDefault();

    const body = {
      group_name: formData.gName,
      group_type: formData.gType,
      sites: formData?.sites,
      company: formData.company,
    };

    try {
      const response = await ajaxCall(
        "multisite/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(body),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Site Document Added Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      console.log("Done!");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Multi-Site" main="Dashboard" />
      <Card sx={{ p: 4, m: 2, boxShadow: 5, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Group Name"
              name="gName"
              value={formData.gName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="company-label">Select Company</InputLabel>
              <Select
                labelId="company-label"
                label="Select Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              >
                {companyData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="site-label">Select Sites</InputLabel>
              <Select
                multiple
                labelId="site-label"
                label="Select Sites"
                name="sites"
                value={formData.sites}
                onChange={handleChange}
              >
                {siteData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.site_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gType-label">Group Type</InputLabel>
              <Select
                labelId="gType-label"
                label="Group Type"
                name="gType"
                value={formData.gType}
                onChange={handleChange}
              >
                <MenuItem value="BASIC">Basic Group</MenuItem>
                <MenuItem value="MULTI">Multi Site Group</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={CreateSiteDocument}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default MultiSite;
