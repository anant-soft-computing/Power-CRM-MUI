import React, { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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

const AddSite = (props) => {
  const [formData, setFormData] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === 'isBillingSiteSame' && checked) {
      setFormData({
        ...formData,
        billingAddressLine1: formData.siteAddressLine1,
        billingAddressLine2: formData.siteAddressLine2,
        billingAddressLine3: formData.siteAddressLine3,
        billingAddressLine4: formData.siteAddressLine4,
        billingCountry: formData.siteCountry,
        billingPostCode: formData.sitePostCode
      });
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL =
      "https://aumhealthresort.com/powercrm/api/sites/create/site/";
    const token = localStorage.getItem("token");
    let sendData = {
      site_name: formData.site_name,
      company: formData.company,
      current_gas_and_electricity_supplier_details:
        formData.current_gas_and_electricity_supplier_details,
      tenant: formData.tenant,
      vacant: formData.vacant,
      change_of_tenancy: formData.change_of_tenancy,
      customer_consent: formData.customer_consent,
      mpan_id: formData.mpan_id,
      site_reference: formData.site_reference,
      support_contact: formData.support_contact,
      lead_source: formData.lead_source,
      notes: formData.notes,
      lead_type: formData.lead_type,
      bill_to_sent: formData.bill_to_sent,
      welcome_letter_send: formData.welcome_letter_send,
      agent_email: formData.agent_email,
      loa_header_to_use: formData.loa_header_to_use,
      loa_template: formData.loa_template,
    };
    if (formData.owner_name) {
      sendData.owner_name = formData.owner_name;
    }
    const billingAddress = {
      billing_address: {
        addressline1: formData.billingAddressLine1,
        addressline2: formData.billingAddressLine2,
        addressline3: formData.billingAddressLine3,
        addressline4: formData.billingAddressLine4,
        country: "United Kingdom",
        postcode: formData.billingPostCode,
      },
    };
    if (
      billingAddress.billing_address.addressline1 ||
      billingAddress.billing_address.addressline2 ||
      billingAddress.billing_address.addressline3 ||
      billingAddress.billing_address.addressline4 ||
      billingAddress.billing_address.country ||
      billingAddress.billing_address.postcode
    ) {
      sendData = { ...sendData, ...billingAddress };
    }
    const siteAaddress = {
      site_address: {
        addressline1: formData.siteAddressLine1,
        addressline2: formData.siteAddressLine2,
        addressline3: formData.siteAddressLine3,
        addressline4: formData.siteAddressLine4,
        country: "United Kingdom",
        postcode: formData.sitePostCode,
      },
    };
    if (
      siteAaddress.site_address.addressline1 ||
      siteAaddress.site_address.addressline2 ||
      siteAaddress.site_address.addressline3 ||
      siteAaddress.site_address.addressline4 ||
      siteAaddress.site_address.country ||
      siteAaddress.site_address.postcode
    ) {
      sendData = { ...sendData, ...siteAaddress };
    }
    const contactsInfo = {
      contacts: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        contact_title: formData.contact_title,
        position: formData.position,
        telephone_number: formData.telephone_number,
        email: formData.email,
      },
    };
    if (
      contactsInfo.contacts.first_name ||
      contactsInfo.contacts.last_name ||
      contactsInfo.contacts.contact_title ||
      contactsInfo.contacts.position ||
      contactsInfo.contacts.telephone_number ||
      contactsInfo.contacts.email
    ) {
      sendData = { ...sendData, ...contactsInfo };
    }
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sendData),
    };

    try {
      const response = await fetch(apiURL, requestOptions);
      if (response.status === 201) {
        toast.success("Enquiry submitted successfully!");
      } else {
        toast.error("Failed to submit enquiry.");
      }
    } catch (error) {
      toast.error("Failed to submit enquiry.");
    }
  };

  const handlePostcodeChange = (e) => {
    setPostcode(e.target.value);
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    const apiURL =
      "https://aumhealthresort.com/powercrm/api/lookup/Property/SearchByPostcode/";
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: postcode,
        isQueryTicket: true,
      }),
    };

    try {
      const response = await fetch(apiURL, requestOptions);
      const data = await response.json();
      if (response.status === 200) {
        setAddresses(data);
        setOpen(true);
        toast.success("Enquiry submitted successfully!");
      } else {
        toast.error("Failed to submit enquiry.");
      }
    } catch (error) {
      toast.error("Failed to submit enquiry.");
    }
  };

  const handleAddressSelect = (row) => {
    setSelectedRow(row);
    setFormData({
      ...formData,
      siteAddressLine1: row?.addressMatch?.address?.addressBreakdown[0] || "",
      siteAddressLine2: row?.addressMatch?.address?.addressBreakdown[1] || "",
      siteAddressLine3: row?.addressMatch?.address?.addressBreakdown[2] || "",
      siteAddressLine4: row?.addressMatch?.address?.addressBreakdown[3] || "",
      siteCountry: row?.addressMatch?.address?.country || "",
      sitePostCode: row?.addressMatch?.address?.postcode || row.postCode || "",
      mpan_id: row?.mpanId
    });
    setOpen(false);
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
                <FormControl fullWidth>
                  <InputLabel id="company-label">Company</InputLabel>
                  <Select
                    labelId="company-label"
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  >
                    {props.CompanyData.map((CompanyData) => (
                      <MenuItem key={CompanyData.id} value={CompanyData.id}>
                        {CompanyData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                <FormControl fullWidth>
                  <InputLabel id="company-label">Contact Title</InputLabel>
                  <Select
                    labelId="company-label"
                    label="Contact Title"
                    name="contact_title"
                    value={formData.contact_title}
                    onChange={handleChange}
                  >
                    <MenuItem value="Dr">Dr</MenuItem>
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Professor">Professor</MenuItem>
                    <MenuItem value="Rev">Rev</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                  </Select>
                </FormControl>
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
                <FormControl fullWidth>
                  <InputLabel id="company-label">Support Contact</InputLabel>
                  <Select
                    labelId="company-label"
                    label="Support Contact"
                    name="support_contact"
                    value={formData.support_contact}
                    onChange={handleChange}
                  >
                    {props.ContactData.map((ContactData) => (
                      <MenuItem key={ContactData.id} value={ContactData.id}>
                        {ContactData.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                <FormControl fullWidth>
                  <InputLabel id="company-label">Lead Type</InputLabel>
                  <Select
                    labelId="company-label"
                    label="Lead Type"
                    name="lead_type"
                    value={formData.lead_type}
                    onChange={handleChange}
                  >
                    <MenuItem value="ELECTRICITY">Electricity</MenuItem>
                    <MenuItem value="GAS">Gas</MenuItem>
                  </Select>
                </FormControl>
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
                <FormControl fullWidth>
                  <InputLabel id="company-label">LOA Template</InputLabel>
                  <Select
                    label="LOA Header to Use"
                    name="loa_header_to_use"
                    value={formData.loa_header_to_use}
                    onChange={handleChange}
                  >
                    <MenuItem value="1">Site Name</MenuItem>
                    <MenuItem value="2">Company Name</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="company-label">LOA Template</InputLabel>
                  <Select
                    labelId="company-label"
                    label="LOA Template"
                    name="loa_template"
                    value={formData.loa_template}
                    onChange={handleChange}
                  >
                    {props.loaData.map((loaData) => (
                      <MenuItem key={loaData.id} value={loaData.id}>
                        {loaData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  const columns = [
    {
      field: "select",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Checkbox
          checked={selectedRow?.mpanId === params.row.mpanId}
          onChange={() => handleAddressSelect(params.row)}
        />
      ),
    },
    { field: "mpanId", headerName: "MPAN ID", width: 200 },
    {
      field: "addressBreakdown0",
      headerName: "Address 1",
      width: 200,
      renderCell: (params) =>
        params.row?.addressMatch?.address?.addressBreakdown[0] || "",
    },
    {
      field: "addressBreakdown1",
      headerName: "Address 2",
      width: 200,
      renderCell: (params) =>
        params.row?.addressMatch?.address?.addressBreakdown[1] || "",
    },
    {
      field: "addressBreakdown2",
      headerName: "Address 3",
      width: 200,
      renderCell: (params) =>
        params.row?.addressMatch?.address?.addressBreakdown[2] || "",
    },
    {
      field: "addressBreakdown3",
      headerName: "Address 4",
      width: 200,
      renderCell: (params) =>
        params.row?.addressMatch?.address?.addressBreakdown[3] || "",
    },
    {
      field: "matchedElectricity",
      headerName: "Electricity",
      width: 200,
      renderCell: (params) => (params.row?.matchedElectricity ? "Yes" : "No"),
    },
    {
      field: "matchedGas",
      headerName: "Gas",
      width: 200,
      renderCell: (params) => (params.row?.matchedGas ? "Yes" : "No"),
    },
    { headerName: "PostCode", field: "postCode", filter: true },
  ];

  return (
    <Container maxWidth="lg">
      <Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add Site
            </Typography>
            <TextField
              sx={{ mb: 2 }}
              label="Postcode"
              value={postcode}
              onChange={handlePostcodeChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLookup}
                    >
                      Lookup
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
          <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
            <DialogTitle>Select Address</DialogTitle>
            <DialogContent>
              <DataGrid
                rows={addresses}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                onRowClick={(params) => handleAddressSelect(params.row)}
                getRowId={(row) => row.propertyAddressId}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Container>
  );
};

export default AddSite;
