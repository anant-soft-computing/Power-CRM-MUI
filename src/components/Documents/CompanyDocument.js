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

const initialCompanyData = {
  name: "",
  document: "",
  description: "",
  company: "",
};

const CompanyDocument = () => {
  const { DocumentId } = useParams();
  const [formData, setFormData] = useState(initialCompanyData);
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    if (DocumentId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        company: DocumentId, // Set the initial value to DocumentId
      }));
    }
  }, [DocumentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `company/`,
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
          setCompanyData(response?.data);
        } else {
          console.error("Fetch error:", response);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("document", formData.document);

    try {
      const response = await ajaxCall(
        "company-document/",
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
        toast.success("Company Document Submitted Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb title="Create Company Document" main="Dashboard" />
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
              <InputLabel id="company-label">Select Company</InputLabel>
              <Select
                labelId="company-label"
                label="Select Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              >
                {companyData.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
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

export default CompanyDocument;
