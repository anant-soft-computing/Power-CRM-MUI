import React, { useReducer, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
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
  Container,
} from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialCompanyData = {
  name: "",
  parent_company: "",
  reference: "",
  number_of_employees: 0,
  registration_no: "",
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

const companyReducer = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.type === "update") {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialCompanyData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const AddCompany = ({ refreshTableMode }) => {
  const [companyData, dispatchCompany] = useReducer(
    companyReducer,
    initialCompanyData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeStep, setActiveStep] = useState(0);

  const validateForm = () => {
    const requiredFields = [
      { field: "name", message: "Company Name is Required" },
      { field: "first_name", message: "First Name is Required" },
      { field: "last_name", message: "Last Name is Required" },
      { field: "email", message: "Email is Required" },
      { field: "position", message: "Position is Required" },
      { field: "telephone_number", message: "Telephone Number is Required" },
    ];
    for (let { field, message } of requiredFields) {
      if (!companyData[field]) {
        setFormError(message);
        return false;
      }
    }
    setFormStatus({ isError: true, errMsg: null, isSubmitting: false });
    return true;
  };

  const handleClose = () => {
    setActiveStep(0);
    resetReducerForm();
    refreshTableMode();
  };

  const resetReducerForm = () => {
    dispatchCompany({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createCompany = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    let sendData = {
      ...companyData,
      contacts: {
        first_name: companyData.first_name,
        last_name: companyData.last_name,
        contact_title: companyData.contact_title,
        position: companyData.position,
        telephone_number: companyData.telephone_number,
        email: companyData.email,
      },
    };
    try {
      const response = await ajaxCall(
        "company/",
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
        toast.success("Company Created Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({ ...formStatus, isSubmitting: false });
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Parent Company"
                name="parent_company"
                value={companyData.parent_company}
                onChange={(e) =>
                  dispatchCompany({
                    type: "parent_company",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={companyData.name}
                onChange={(e) =>
                  dispatchCompany({
                    type: "name",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reference"
                name="reference"
                value={companyData.reference}
                onChange={(e) =>
                  dispatchCompany({
                    type: "reference",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Number of Employees"
                type="number"
                name="number_of_employees"
                value={companyData.number_of_employees}
                onChange={(e) =>
                  dispatchCompany({
                    type: "number_of_employees",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Registration No"
                name="registration_no"
                value={companyData.registration_no}
                onChange={(e) =>
                  dispatchCompany({
                    type: "registration_no",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Turnover"
                type="number"
                name="estimated_turnover"
                value={companyData.estimated_turnover}
                onChange={(e) =>
                  dispatchCompany({
                    type: "estimated_turnover",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="company-label">Business Type</InputLabel>
                <Select
                  labelId="company-label"
                  label="Business Type"
                  name="business_type"
                  value={companyData.business_type}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "business_type",
                      value: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="LTD">LTD</MenuItem>
                  <MenuItem value="PLC">PLC</MenuItem>
                  <MenuItem value="LLP">LLP</MenuItem>
                  <MenuItem value="LLC">LLC</MenuItem>
                  <MenuItem value="Charity">Charity</MenuItem>
                  <MenuItem value="Jersey Based">Jersey Based</MenuItem>
                  <MenuItem value="Public Sector">Public Sector</MenuItem>
                  <MenuItem value="Non LTD">Non LTD</MenuItem>
                  <MenuItem value="Partnership">Partnership</MenuItem>
                  <MenuItem value="Church / Community Organisation">
                    Church / Community Organisation
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="is_macro_business"
                    checked={companyData.is_macro_business}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "is_macro_business",
                        value: e.target.checked,
                      });
                    }}
                  />
                }
                label="Is Macro Business"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address Line 1"
                name="addressline1_company"
                value={companyData.addressline1_company}
                onChange={(e) =>
                  dispatchCompany({
                    type: "addressline1_company",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address Line 2"
                name="addressline2_company"
                value={companyData.addressline2_company}
                onChange={(e) =>
                  dispatchCompany({
                    type: "addressline2_company",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address Line 3"
                name="addressline3_company"
                value={companyData.addressline3_company}
                onChange={(e) =>
                  dispatchCompany({
                    type: "addressline3_company",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postcode"
                type="number"
                name="postcode"
                value={companyData.postcode}
                onChange={(e) =>
                  dispatchCompany({
                    type: "postcode",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country_of_company"
                value={companyData.country_of_company}
                onChange={(e) =>
                  dispatchCompany({
                    type: "country_of_company",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Name"
                name="account_name"
                value={companyData.account_name}
                onChange={(e) =>
                  dispatchCompany({
                    type: "account_name",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bank_name"
                value={companyData.bank_name}
                onChange={(e) =>
                  dispatchCompany({
                    type: "bank_name",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account No"
                name="account_no"
                value={companyData.account_no}
                onChange={(e) =>
                  dispatchCompany({
                    type: "account_no",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shortcode"
                name="shortcode"
                value={companyData.shortcode}
                onChange={(e) =>
                  dispatchCompany({
                    type: "shortcode",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SIC Code"
                name="sic_code"
                value={companyData.sic_code}
                onChange={(e) =>
                  dispatchCompany({
                    type: "sic_code",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Partner Name"
                name="partner_name"
                value={companyData.partner_name}
                onChange={(e) =>
                  dispatchCompany({
                    type: "partner_name",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Partner DOB"
                type="date"
                name="partner_dob"
                value={companyData.partner_dob}
                onChange={(e) =>
                  dispatchCompany({
                    type: "partner_dob",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={companyData.address}
                onChange={(e) =>
                  dispatchCompany({
                    type: "address",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Home Post Code"
                name="home_post_code"
                value={companyData.home_post_code}
                onChange={(e) =>
                  dispatchCompany({
                    type: "home_post_code",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time at Address (Months)"
                type="number"
                name="time_at_address_months"
                value={companyData.time_at_address_months}
                onChange={(e) =>
                  dispatchCompany({
                    type: "time_at_address_months",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time at Address (Years)"
                type="number"
                name="time_at_address_years"
                value={companyData.time_at_address_years}
                onChange={(e) =>
                  dispatchCompany({
                    type: "time_at_address_years",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={companyData.first_name}
                onChange={(e) =>
                  dispatchCompany({
                    type: "first_name",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={companyData.last_name}
                onChange={(e) =>
                  dispatchCompany({
                    type: "last_name",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="company-label">Contact Title</InputLabel>
                <Select
                  labelId="company-label"
                  label="Contact Title"
                  name="contact_title"
                  value={companyData.contact_title}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "contact_title",
                      value: e.target.value,
                    })
                  }
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
                value={companyData.position}
                onChange={(e) =>
                  dispatchCompany({
                    type: "position",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telephone Number"
                name="telephone_number"
                value={companyData.telephone_number}
                onChange={(e) =>
                  dispatchCompany({
                    type: "telephone_number",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={companyData.email}
                onChange={(e) =>
                  dispatchCompany({
                    type: "email",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" padding={1} margin={1}>
        Add Company
      </Typography>
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
              onClick={createCompany}
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
    </Container>
  );
};

export default AddCompany;
