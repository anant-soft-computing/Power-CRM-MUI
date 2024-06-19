import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

const initialState = {
  site_name: "",
  company: "",
  owner_name: "",
  current_gas_and_electricity_supplier_details: "",
  tenant: true,
  vacant: false,
  change_of_tenancy: false,
  customer_consent: false,
  mpan_id: "",

  siteAddressLine1: "",
  siteAddressLine2: "",
  siteAddressLine3: "",
  siteAddressLine4: "",
  siteCountry: "United Kingdom",
  sitePostCode: "",

  isBillingSiteSame: false,

  billingAddressLine1: "",
  billingAddressLine2: "",
  billingAddressLine3: "",
  billingAddressLine4: "",
  billingCountry: "United Kingdom",
  billingPostCode: "",

  site_reference: "",
  support_contact: "",
  lead_source: "",
  notes: "",
  lead_type: "",
  bill_to_sent: false,
  welcome_letter_send: false,

  first_name: "",
  last_name: "",
  contact_title: "",
  position: "",
  telephone_number: "",
  email: "",

  agent_email: "",
  loa_header_to_use: "",
  loa_template: "",
};

const steps = [
  "Site Information",
  "Site Address",
  "Billing Information",
  "Contact Information",
  "Additional Information",
];

const AddSite = () => {
  const [formData, setFormData] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box mb={2}>
            <Typography variant="h6">Site Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Site Name"
                  name="site_name"
                  value={formData.site_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Owner Name"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gas and Electricity Supplier"
                  name="current_gas_and_electricity_supplier_details"
                  value={formData.current_gas_and_electricity_supplier_details}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.tenant}
                      onChange={handleChange}
                      name="tenant"
                    />
                  }
                  label="Tenant"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.vacant}
                      onChange={handleChange}
                      name="vacant"
                    />
                  }
                  label="Vacant"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.change_of_tenancy}
                      onChange={handleChange}
                      name="change_of_tenancy"
                    />
                  }
                  label="Change of Tenancy"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.customer_consent}
                      onChange={handleChange}
                      name="customer_consent"
                    />
                  }
                  label="Customer Consent"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="MPAN ID"
                  name="mpan_id"
                  value={formData.mpan_id}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box mb={2}>
            <Typography variant="h6">Site Address</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 1"
                  name="siteAddressLine1"
                  value={formData.siteAddressLine1}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 2"
                  name="siteAddressLine2"
                  value={formData.siteAddressLine2}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 3"
                  name="siteAddressLine3"
                  value={formData.siteAddressLine3}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 4"
                  name="siteAddressLine4"
                  value={formData.siteAddressLine4}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="siteCountry"
                  value={formData.siteCountry}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Post Code"
                  name="sitePostCode"
                  value={formData.sitePostCode}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box mb={2}>
            <Typography variant="h6">Billing Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isBillingSiteSame}
                      onChange={handleChange}
                      name="isBillingSiteSame"
                    />
                  }
                  label="Billing Address is the same as Site Address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 1"
                  name="billingAddressLine1"
                  value={formData.billingAddressLine1}
                  onChange={handleChange}
                  disabled={formData.isBillingSiteSame}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 2"
                  name="billingAddressLine2"
                  value={formData.billingAddressLine2}
                  onChange={handleChange}
                  disabled={formData.isBillingSiteSame}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 3"
                  name="billingAddressLine3"
                  value={formData.billingAddressLine3}
                  onChange={handleChange}
                  disabled={formData.isBillingSiteSame}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 4"
                  name="billingAddressLine4"
                  value={formData.billingAddressLine4}
                  onChange={handleChange}
                  disabled={formData.isBillingSiteSame}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Billing Country"
                  name="billingCountry"
                  value={formData.billingCountry}
                  onChange={handleChange}
                  disabled={formData.isBillingSiteSame}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Billing Post Code"
                  name="billingPostCode"
                  value={formData.billingPostCode}
                  onChange={handleChange}
                  disabled={formData.isBillingSiteSame}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box mb={2}>
            <Typography variant="h6">Contact Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Title"
                  name="contact_title"
                  value={formData.contact_title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telephone Number"
                  name="telephone_number"
                  value={formData.telephone_number}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 4:
        return (
          <Box mb={2}>
            <Typography variant="h6">Additional Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Site Reference"
                  name="site_reference"
                  value={formData.site_reference}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Support Contact"
                  name="support_contact"
                  value={formData.support_contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lead Source"
                  name="lead_source"
                  value={formData.lead_source}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lead Type"
                  name="lead_type"
                  value={formData.lead_type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.bill_to_sent}
                      onChange={handleChange}
                      name="bill_to_sent"
                    />
                  }
                  label="Bill to Sent"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.welcome_letter_send}
                      onChange={handleChange}
                      name="welcome_letter_send"
                    />
                  }
                  label="Welcome Letter Send"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Agent Email"
                  name="agent_email"
                  value={formData.agent_email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="LOA Header to Use"
                  name="loa_header_to_use"
                  value={formData.loa_header_to_use}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="LOA Template"
                  name="loa_template"
                  value={formData.loa_template}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Site
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default AddSite;
