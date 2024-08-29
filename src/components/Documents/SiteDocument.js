import React, { useState, useEffect } from "react";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Container,
  Input,
  Button,
  MenuItem,
  Card,
} from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";

const initialSiteData = {
  name: "",
  document: "",
  description: "",
  site: "",
};

const SiteDocument = () => {
  const { SiteDocumentID } = useParams();
  const [formData, setFormData] = useState(initialSiteData);
  const [siteData, setSiteData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      document: file,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `sites/get/site/`,
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
          setSiteData(response?.data);
        } else {
          console.error("Fetch error:", response);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (SiteDocumentID) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        site: SiteDocumentID,
      }));
    }
  }, [SiteDocumentID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("site", formData.site);
    formDataToSend.append("document", formData.document);

    try {
      const response = await ajaxCall(
        "site-document/",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: formDataToSend,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Site Document Submitted Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Create Site Document" main="Dashboard" />
      <Card sx={{ p: 4, m: 2, boxShadow: 5, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Document Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="site-label">Select Site</InputLabel>
              <Select
                labelId="site-label"
                label="Select Site"
                name="site"
                value={formData.site}
                onChange={handleChange}
              >
                {siteData.map((site) => (
                  <MenuItem key={site.id} value={site.id}>
                    {site.site_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Input
                id="upload-document"
                name="document"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default SiteDocument;
