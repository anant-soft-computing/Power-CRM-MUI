import React, { useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../../css/custom.css";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";
import { useLocation } from "react-router-dom";
import DocumentUploadForm from "./DocumentUploadForm";

const initialSiteData = {
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
  "Billing Address",
  "Our Details",
  "Contact Information",
  "Letter Of Authority",
];

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const AddSite = ({ companyData, contactData, refreshTableMode }) => {
  const location = useLocation();
  const data = location.state;
  const [open, setOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState(initialSiteData);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    const {
      site_name,
      company,
      siteAddressLine1,
      siteAddressLine2,
      siteAddressLine3,
      siteAddressLine4,
      sitePostCode,
      billingAddressLine1,
      billingAddressLine2,
      billingAddressLine3,
      billingAddressLine4,
      billingPostCode,
    } = formData;

    if (!site_name) {
      setFormError("Site Name is Required");
      return false;
    }
    if (!company) {
      setFormError("Company Name is Required");
      return false;
    }
    if (
      !(
        siteAddressLine1 ||
        siteAddressLine2 ||
        siteAddressLine3 ||
        siteAddressLine4 ||
        sitePostCode
      )
    ) {
      setFormError("Site Address is Required");
      return false;
    }
    if (
      !(
        billingAddressLine1 ||
        billingAddressLine2 ||
        billingAddressLine3 ||
        billingAddressLine4 ||
        billingPostCode
      )
    ) {
      setFormError("Billing Address is Required");
      return false;
    }
    setFormStatus({ isError: true, errMsg: null, isSubmitting: false });
    return true;
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "isBillingSiteSame") {
      if (checked) {
        newFormData = {
          ...newFormData,
          billingAddressLine1: formData.siteAddressLine1,
          billingAddressLine2: formData.siteAddressLine2,
          billingAddressLine3: formData.siteAddressLine3,
          billingAddressLine4: formData.siteAddressLine4,
          billingCountry: formData.siteCountry,
          billingPostCode: formData.sitePostCode,
        };
      } else {
        newFormData = {
          ...newFormData,
          billingAddressLine1: "",
          billingAddressLine2: "",
          billingAddressLine3: "",
          billingAddressLine4: "",
          billingCountry: "United Kingdom",
          billingPostCode: "",
        };
      }
    }
    setFormData(newFormData);
  };

  const handleClose = () => {
    setActiveStep(0);
    setFormData(initialSiteData);
    refreshTableMode();
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const createSite = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
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
    try {
      const response = await ajaxCall(
        "sites/create/site/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(sendData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        handleClose();
        toast.success("Site Created Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({
        ...formStatus,
        isSubmitting: false,
      });
    }
  };

  const searchByPostCode = async (e) => {
    e.preventDefault();
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const response = await ajaxCall(
        "lookup/Property/SearchByPostcode/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify({
            query: postcode,
            isQueryTicket: true,
          }),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        setOpen(true);
        setAddresses(response.data);
        toast.success("Search Successful");
        setFormStatus((prev) => ({ ...prev, isSubmitting: false }));
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus((prev) => ({ ...prev, isSubmitting: false }));
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
      lead_type: row?.matchedElectricity ? "ELECTRICITY" : "GAS",
      sitePostCode: row?.addressMatch?.address?.postcode || row.postCode || "",
      mpan_id: row?.mpanId,
    });
    setOpen(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Site Name"
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel id="company-label">Company</InputLabel>
                <Select
                  labelId="company-label"
                  label="Company"
                  name="company"
                  value={data}
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
              <TextField
                fullWidth
                label="Tenant / Owner Name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Current Gas & Electricity Supplier Details"
                name="current_gas_and_electricity_supplier_details"
                value={formData.current_gas_and_electricity_supplier_details}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
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
            <Grid item sm={6}>
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
            <Grid item sm={6}>
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
            <Grid item sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.customer_consent}
                    onChange={handleChange}
                    name="customer_consent"
                  />
                }
                label="Please Confirm Customer Consent Has Been Received To Be Contacted Regarding The Current Quote"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Address Line 1"
                name="siteAddressLine1"
                value={formData.siteAddressLine1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Address Line 2"
                name="siteAddressLine2"
                value={formData.siteAddressLine2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Address Line 3"
                name="siteAddressLine3"
                value={formData.siteAddressLine3}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Address Line 4"
                name="siteAddressLine4"
                value={formData.siteAddressLine4}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Post Code"
                name="sitePostCode"
                value={formData.sitePostCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField fullWidth label="Country" value="United Kingdom" />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <>
            <Grid item>
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
            <Grid container spacing={2} mt={1}>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 1"
                  name="billingAddressLine1"
                  value={formData.billingAddressLine1}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 2"
                  name="billingAddressLine2"
                  value={formData.billingAddressLine2}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 3"
                  name="billingAddressLine3"
                  value={formData.billingAddressLine3}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Billing Address Line 4"
                  name="billingAddressLine4"
                  value={formData.billingAddressLine4}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Billing Post Code"
                  name="billingPostCode"
                  value={formData.billingPostCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Billing Country"
                  value="United Kingdom"
                />
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Site Reference"
                  name="site_reference"
                  value={formData.site_reference}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="company-label">Support Contact</InputLabel>
                  <Select
                    labelId="company-label"
                    label="Support Contact"
                    name="support_contact"
                    value={formData.support_contact}
                    onChange={handleChange}
                  >
                    {contactData.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Lead Source"
                  name="lead_source"
                  value={formData.lead_source}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
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
            </Grid>
            <Box mt={2}>
              <Grid item sm={6}>
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
              <Grid item sm={6}>
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
            </Box>
          </>
        );
      case 4:
        return (
          <>
            <Grid item sm={6}>
              <FormControlLabel
                control={<Switch checked />}
                label="Primary Contact"
              />
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="contact-list-label">Contact List</InputLabel>
                  <Select labelId="contact-list-label" label="Contact List">
                    <MenuItem value=""></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
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
              <Grid item sm={6}>
                <TextField fullWidth type="text" label="Contact Name" />
              </Grid>
              <Grid item sm={6}>
                <TextField fullWidth type="text" label="Job Title" />
              </Grid>
              <Grid item sm={6}>
                <TextField fullWidth type="text" label="Direct Line" />
              </Grid>
              <Grid item sm={6}>
                <TextField fullWidth type="text" label="Landline" />
              </Grid>
              <Grid item sm={6}>
                <TextField fullWidth type="text" label="Mobile" />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Typography variant="h6" mt={2}>
              Marketing Preferences (Optional)
            </Typography>
            <Box display="flex" flexWrap="wrap">
              <Grid item sm={6}>
                <FormControlLabel control={<Switch checked />} label="Email" />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel control={<Switch checked />} label="Phone" />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel control={<Switch checked />} label="SMS" />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel control={<Switch checked />} label="Post" />
              </Grid>
            </Box>
          </>
        );
      case 5:
        return (
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField fullWidth label="Agent Email" />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel id="loa-template-label">LOA Template</InputLabel>
                <Select labelId="loa-template-label" label="LOA Template">
                  <MenuItem value="Power Standard LOA">
                    Power Standard LOA
                  </MenuItem>
                  <MenuItem value="SSE-LOA">SSE-LOA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="LOA Start Date"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="LOA End Date"
              />
            </Grid>
          </Grid>
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
      renderCell: (params) =>
        params.row?.matchedElectricity ? <CheckIcon /> : <CancelIcon />,
    },
    {
      field: "matchedGas",
      headerName: "Gas",
      width: 200,
      renderCell: (params) =>
        params.row?.matchedGas ? <CheckIcon /> : <CancelIcon />,
    },
    { headerName: "PostCode", field: "postCode", filter: true },
  ];

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" padding={1} margin={1}>
          Add Site
        </Typography>
        <TextField
          sx={{ m: 2 }}
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {formStatus.isSubmitting ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    onClick={searchByPostCode}
                  >
                    Look Up
                  </Button>
                )}
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
      {renderStepContent(activeStep)}
      {formStatus.isError && (
        <Typography
          color="error"
          sx={{ mt: 2 }}
          align="center"
          variant="h6"
          component="div"
        >
          {formStatus.errMsg}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          formStatus.isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formStatus.isSubmitting}
              onClick={createSite}
            >
              Submit
            </Button>
          )
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
        <DialogTitle>Select Address</DialogTitle>
        <DialogContent>
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={addresses}
              columns={columns}
              disableColumnFilter
              disableDensitySelector
              onRowClick={(params) => handleAddressSelect(params.row)}
              getRowId={(row) => row.propertyAddressId}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
        <DocumentUploadForm />
      </Dialog>
    </Container>
  );
};

export default AddSite;
