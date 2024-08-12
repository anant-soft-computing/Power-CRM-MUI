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

const initialSiteData = {
  name: "",
  document: "",
  description: "",
  companyOrSite: "",
  documentType: "company",
};

const Document = () => {
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
    if (formData.documentType === "company") {
      fetchData(`company/`, setSiteData);
    } else if (formData.documentType === "site") {
      fetchData(`sites/get/site/`, setSiteData);
    }
  }, [formData.documentType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      formData.documentType === "company" ? "company" : "site",
      formData.companyOrSite
    );
    formDataToSend.append("document", formData.document);

    const apiEndpoint =
      formData.documentType === "company"
        ? "company-document/"
        : "site-document/";

    try {
      const response = await ajaxCall(
        apiEndpoint,
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
        toast.success("Document Submitted Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Submit Document" main="Dashboard" />
      <Card sx={{ p: 4, m: 2, boxShadow: 5, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <FormControl fullWidth>
              <InputLabel id="document-type-label">Document Type</InputLabel>
              <Select
                labelId="document-type-label"
                label="Document Type"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
              >
                <MenuItem value="company">Company Document</MenuItem>
                <MenuItem value="site">Site Document</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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
              <InputLabel id="company-or-site-label">
                Select{" "}
                {formData.documentType === "company" ? "Company" : "Site"}
              </InputLabel>
              <Select
                labelId="company-or-site-label"
                label={`Select ${
                  formData.documentType === "company" ? "Company" : "Site"
                }`}
                name="companyOrSite"
                value={formData.companyOrSite}
                onChange={handleChange}
              >
                {siteData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name || item.site_name}
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

export default Document;
