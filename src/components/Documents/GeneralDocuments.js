import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Container,
  Input,
  Button,
  Card,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const initialSiteData = {
  name: "",
  document: "",
  description: "",
  site: "",
};

const GeneralDocuments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialSiteData);
  const [DocumentData, setDocumentData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `general-document/`,
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
          setDocumentData(response?.data);
          setIsLoading(false);
        } else {
          console.error("Fetch error:", response);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      headerName: "Document Name",
      field: "name",
      width: 200,
    },

    {
      headerName: "Description",
      field: "description",
      width: 200,
    },
    {
      headerName: "Document",
      field: "document",
      width: 200,
      renderCell: (params) => {
        return params.row.document ? (
          <Button
            href={`${params.row.document}`}
            variant="contained"
            color="primary"
          >
            {"View Document"}
          </Button>
        ) : (
          "N/A"
        );
      },
    },
  ];

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
    formDataToSend.append("document", formData.document);

    try {
      const response = await ajaxCall(
        "general-document/",
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
      <Breadcrumb title="Create General Document" main="Dashboard" />
      <Card sx={{ mt: 3, p: 3, boxShadow: 5, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              size="small"
              fullWidth
              label="Document Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              size="small"
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <Input
                size="small"
                id="upload-document"
                name="document"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 3, p: 3, boxShadow: 5, borderRadius: 3 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : DocumentData.length > 0 ? (
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={DocumentData}
              columns={columns}
              disableColumnFilter
              disableDensitySelector
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "evenRow"
                  : "oddRow"
              }
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>
        ) : (
          <Typography
            color="error"
            sx={{ mt: 2 }}
            align="center"
            variant="h6"
            component="div"
          >
            No Documents Available !!
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default GeneralDocuments;
