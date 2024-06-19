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
import moment from "moment";

const initialState = {
  name: "",
  parent_company: "",
  reference: "",
  number_of_employees: 0,
  registrationNo: "",
  estimated_turnover: 0,
  business_type: "",
  is_macro_business: false,

  addressline1_company: "",
  addressline2_company: "",
  addressline3_company: "",
  postcode: 0,
  country_of_company: "",

  account_name: "",
  bank_name: "",
  account_no: "",
  shortcode: "",
  sic_code: "",

  partner_name: "",
  partner_dob: moment().format("YYYY-MM-DD"),
  address: "",
  home_post_code: "",
  time_at_address_months: 0,
  time_at_address_years: 0,

  first_name: "",
  last_name: "",
  contact_title: "",
  position: "",
  telephone_number: "",
  email: "",
};

const steps = [
  "Company Information",
  "Company Address",
  "Bank Information",
  "Partner Information",
  "Contact Information",
];

const AddCompany = () => {
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
            <Typography variant="h6">Company Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Parent Company"
                  name="parent_company"
                  value={formData.parent_company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Employees"
                  type="number"
                  name="number_of_employees"
                  value={formData.number_of_employees}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Registration No"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estimated Turnover"
                  type="number"
                  name="estimated_turnover"
                  value={formData.estimated_turnover}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Business Type"
                  name="business_type"
                  value={formData.business_type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_macro_business}
                      onChange={handleChange}
                      name="is_macro_business"
                    />
                  }
                  label="Is Macro Business"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box mb={2}>
            <Typography variant="h6">Company Address</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 1"
                  name="addressline1_company"
                  value={formData.addressline1_company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 2"
                  name="addressline2_company"
                  value={formData.addressline2_company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address Line 3"
                  name="addressline3_company"
                  value={formData.addressline3_company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postcode"
                  type="number"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country_of_company"
                  value={formData.country_of_company}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box mb={2}>
            <Typography variant="h6">Bank Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Name"
                  name="account_name"
                  value={formData.account_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account No"
                  name="account_no"
                  value={formData.account_no}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Shortcode"
                  name="shortcode"
                  value={formData.shortcode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SIC Code"
                  name="sic_code"
                  value={formData.sic_code}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box mb={2}>
            <Typography variant="h6">Partner Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Partner Name"
                  name="partner_name"
                  value={formData.partner_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Partner DOB"
                  type="date"
                  name="partner_dob"
                  value={formData.partner_dob}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Home Post Code"
                  name="home_post_code"
                  value={formData.home_post_code}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time at Address (Months)"
                  type="number"
                  name="time_at_address_months"
                  value={formData.time_at_address_months}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time at Address (Years)"
                  type="number"
                  name="time_at_address_years"
                  value={formData.time_at_address_years}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 4:
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
      default:
        return "Unknown step";
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add Company
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

export default AddCompany;
