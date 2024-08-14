import React, { useReducer, useState } from "react";
import {
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  Checkbox,
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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckIcon from "../../UI/Icons/CheckIcon";
import CancelIcon from "../../UI/Icons/Cancel";

const initialCompanyData = {
  name: "",
  parent_company: "",
  reference: "",
  number_of_employees: 0,
  registration_no: "",
  estimated_turnover: 0,
  business_type: "",
  is_macro_business: false,
  customer_value: "",
  customer_status: "",
  credit_score: "",
  company_sector: "",
  building_use: "",
  turnover: "",
  net_worth: "",
  website_url: "",
  vat_declatarion: "",
  vat: "",
  vat_number: "",
  payment_type: "",
  bank_postcode: "",
  job_title: "",
  direct_line: "",
  mobile: "",
  primary_contact: true,
  phone: true,
  sms: true,
  post: true,

  addressline1_company: "",
  addressline2_company: "",
  addressline3_company: "",
  postcode: "",
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

  contact_name: "",
  contact_title: "",
  // position: "",
  telephone_number: "",
  email: "",
};

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
  "Company Details",
  "Company Address",
  "Payment Details",
  "Letter Of Authority",
  "Contact Details",
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
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  // const [postcode, setPostcode] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState(initialSiteData);

  const validateForm = () => {
    const requiredFields = [
      // { field: "name", message: "Company Name is Required" },
      // { field: "contact_name", message: "Contact Name is Required" },
      // { field: "email", message: "Email is Required" },
      // { field: "position", message: "Position is Required" },
      // { field: "telephone_number", message: "Telephone Number is Required" },
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
        contact_name: companyData.contact_name,
        contact_title: companyData.contact_title,
        telephone_number: companyData.telephone_number,
        email: companyData.email,
        company_incorporated_date: companyData.company_incorporated_date,
        director_date_of_birth: companyData.director_date_of_birth,
        direct_debit_start_date: companyData.direct_debit_start_date,
        loa_start_date: companyData.loa_start_date,
        loa_end_date: companyData.loa_end_date,
        primary_contact: companyData.primary_contact,
        post: companyData.post,
        sms: companyData.sms,
        phone: companyData.phone,
        job_title: companyData.job_title,
        direct_line: companyData.direct_line,
        mobile: companyData.mobile,
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

  // const searchByPostCode = async (e) => {
  //   e.preventDefault();
  //   setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
  //   try {
  //     const response = await ajaxCall(
  //       "lookup/Property/SearchByPostcode/",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${
  //             JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
  //           }`,
  //         },
  //         method: "POST",
  //         body: JSON.stringify({
  //           query: postcode,
  //           isQueryTicket: true,
  //         }),
  //       },
  //       8000
  //     );
  //     if ([200, 201].includes(response.status)) {
  //       setOpen(true);
  //       setAddresses(response.data);
  //       toast.success("Search Successful");
  //       setFormStatus((prev) => ({ ...prev, isSubmitting: false }));
  //     } else {
  //       toast.error("Some Problem Occurred. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Some Problem Occurred. Please try again.");
  //   } finally {
  //     setFormStatus((prev) => ({ ...prev, isSubmitting: false }));
  //   }
  // };

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
          <>
            <Grid container spacing={2}>
              <Grid item sm={4}>
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
              <Grid item sm={4}>
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
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="company-label">Company Type</InputLabel>
                  <Select
                    labelId="company-label"
                    label="Company Type"
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
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Company Number"
                  name="registration_no"
                  value={companyData.registration_no}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "registration_no",
                      value: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Company Incorporated Date"
                  name="company_incorporated_date"
                  value={companyData.company_incorporated_date}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "company_incorporated_date",
                      value: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="customer-status-label">
                    Customer Status
                  </InputLabel>
                  <Select
                    labelId="customer-status-label"
                    label="Customer Status"
                    name="customer_status"
                    value={companyData.customer_status}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "customer_status",
                        value: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Lead">Lead</MenuItem>
                    <MenuItem value="FSO">FSO</MenuItem>
                    <MenuItem value="Renewal">Renewal</MenuItem>
                    <MenuItem value="Live">Live</MenuItem>
                    <MenuItem value="Sold not live">Sold not live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  name="customer_value"
                  type="text"
                  label="Customer Value"
                  value={companyData.customer_value}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "customer_value",
                      value: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Director Date of Birth"
                  name="director_date_of_birth"
                  value={companyData.director_date_of_birth}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "director_date_of_birth",
                      value: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  type="text"
                  label="Credit Score"
                  name="credit_score"
                  value={companyData.credit_score}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "credit_score",
                      value: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="company-sector-label">
                    Company Sector
                  </InputLabel>
                  <Select
                    labelId="company-sector-label"
                    label="Company Sector"
                    name="company_sector"
                    value={companyData.company_sector}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "company_sector",
                        value: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Care Home">Care Home</MenuItem>
                    <MenuItem value="Charity">Charity</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Offices">Offices</MenuItem>
                    <MenuItem value="Construction">Construction</MenuItem>
                    <MenuItem value="Convenience Store">
                      Convenience Store
                    </MenuItem>
                    <MenuItem value="Distribution">Distribution</MenuItem>
                    <MenuItem value="Education and Local Authorities">
                      Education and Local Authorities
                    </MenuItem>
                    <MenuItem value="Environmental">Environmental</MenuItem>
                    <MenuItem value="Farming and Agriculture">
                      Farming and Agriculture
                    </MenuItem>
                    <MenuItem value="Florist">Florist</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Garage">Garage</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Hair Salon/Barber">
                      Hair Salon/Barber
                    </MenuItem>
                    <MenuItem value="Hotels/Leisure">Hotels/Leisure</MenuItem>
                    <MenuItem value="Hospitality">Hospitality</MenuItem>
                    <MenuItem value="Laundrette">Laundrette</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Newsagent">Newsagent</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="Place of Worship">
                      Place of Worship
                    </MenuItem>
                    <MenuItem value="Professional Services">
                      Professional Services
                    </MenuItem>
                    <MenuItem value="Property Agents">Property Agents</MenuItem>
                    <MenuItem value="Pub/Club">Pub/Club</MenuItem>
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Service Station">Service Station</MenuItem>
                    <MenuItem value="Sports and Leisure">
                      Sports and Leisure
                    </MenuItem>
                    <MenuItem value="Tanning Salon">Tanning Salon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  type="text"
                  label="SIC Code"
                  name="sic_code"
                  value={companyData.sic_code}
                  onChange={(e) => {
                    dispatchCompany({
                      type: "sic_code",
                      value: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="turnover-label">Turnover</InputLabel>
                  <Select
                    labelId="turnover-label"
                    label="Turnover"
                    name="turnover"
                    value={companyData.turnover}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "turnover",
                        value: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Unclassified">Unclassified</MenuItem>
                    <MenuItem value="1 to <90k">1 to {"<"}90k</MenuItem>
                    <MenuItem value="90k to <400k">90k to {"<"}400k</MenuItem>
                    <MenuItem value="400k to <1m">400k to {"<"}1m</MenuItem>
                    <MenuItem value="1m to <2.5m">1m to {"<"}2.5m</MenuItem>
                    <MenuItem value="2.5m to <5m">2.5m to {"<"}5m</MenuItem>
                    <MenuItem value="5m to <10m">5m to {"<"}10m</MenuItem>
                    <MenuItem value="10m to <40m">10m to {"<"}40m</MenuItem>
                    <MenuItem value="40m+">40m+</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="net-worth-label">Net Worth</InputLabel>
                  <Select
                    labelId="net-worth-label"
                    label="Net Worth"
                    name="net_worth"
                    value={companyData.net_worth}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "net_worth",
                        value: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Unclassified">Unclassified</MenuItem>
                    <MenuItem value="1 to <90k">1 to {"<"}90k</MenuItem>
                    <MenuItem value="90k to <400k">90k to {"<"}400k</MenuItem>
                    <MenuItem value="400k to <1m">400k to {"<"}1m</MenuItem>
                    <MenuItem value="1m to <2.5m">1m to {"<"}2.5m</MenuItem>
                    <MenuItem value="2.5m to <5m">2.5m to {"<"}5m</MenuItem>
                    <MenuItem value="5m to <10m">5m to {"<"}10m</MenuItem>
                    <MenuItem value="10m to <40m">10m to {"<"}40m</MenuItem>
                    <MenuItem value="40m+">40m+</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="building-use-label">Building Use</InputLabel>
                  <Select
                    labelId="building-use-label"
                    label="Building Use"
                    name="building_use"
                    value={companyData.building_use}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "building_use",
                        value: e.target.value,
                      });
                    }}
                  >
                    <MenuItem value="Agriculture">Agriculture</MenuItem>
                    <MenuItem value="Educational">Educational</MenuItem>
                    <MenuItem value="Government/Local Authority">
                      Government/Local Authority
                    </MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                    <MenuItem value="Military">Military</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="Parking">Parking</MenuItem>
                    <MenuItem value="Power Station/Plants">
                      Power Station/Plants
                    </MenuItem>
                    <MenuItem value="Religious">Religious</MenuItem>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Transport">Transport</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
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
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  label="Website URL"
                  type="URLField"
                  name="website_url"
                  value={companyData.website_url}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "website_url",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="vat-label">VAT Declaration</InputLabel>
                  <Select
                    labelId="vat-label"
                    label="VAT Declaration"
                    name="vat_declatarion"
                    value={companyData.vat_declatarion}
                    onChange={(e) =>
                      dispatchCompany({
                        type: "vat_declatarion",
                        value: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  label="VAT %"
                  type="text"
                  name="vat"
                  value={companyData.vat}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "vat",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  label="VAT Number"
                  type="number"
                  name="vat_number"
                  value={companyData.vat_number}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "vat_number",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Grid item sm={4} mt={2}>
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
          </>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item sm={6}>
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
            <Grid item sm={6}>
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
            <Grid item sm={6}>
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

            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Post Code"
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

            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  label="Country"
                  type="text"
                  name="country_of_company"
                  value={companyData.country_of_company}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "country_of_company",
                      value: e.target.value,
                    })
                  }
                >
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="England">England</MenuItem>
                  <MenuItem value="Scotland">Scotland</MenuItem>
                  <MenuItem value="Ireland">Ireland</MenuItem>
                  <MenuItem value="Northern Ireland">Northern Ireland</MenuItem>
                  <MenuItem value="Republic of Ireland">
                    Republic of Ireland
                  </MenuItem>
                  <MenuItem value="Wales">Wales</MenuItem>
                  <MenuItem value="Belgium">Belgium</MenuItem>
                  <MenuItem value="Jersey">Jersey</MenuItem>
                  <MenuItem value="Guernsey">Guernsey</MenuItem>
                  <MenuItem value="Isle of Wight">Isle of Wight</MenuItem>
                  <MenuItem value="Isle of Man">Isle of Man</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel id="payment-type-label">Payment Type</InputLabel>
                <Select
                  labelId="payment-type-label"
                  label="Payment Type"
                  name="payment_type"
                  value={companyData.payment_type}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "payment_type",
                      value: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Monthly Direct Debit">
                    Monthly Direct Debit
                  </MenuItem>
                  <MenuItem value="Quarterly Direct Debit">
                    Quarterly Direct Debit
                  </MenuItem>
                  <MenuItem value="Cash/Cheque">Cash/Cheque</MenuItem>
                  <MenuItem value="Variable Direct Debit">
                    Variable Direct Debit
                  </MenuItem>
                  <MenuItem value="BACS">BACS</MenuItem>
                  <MenuItem value="Prepayment">Prepayment</MenuItem>
                  <MenuItem value="Unspecified">Unspecified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Direct Debit Start Date"
                name="direct_debit_start_date"
                value={companyData.direct_debit_start_date}
                onChange={(e) =>
                  dispatchCompany({
                    type: "direct_debit_start_date",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Account Number"
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
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="text"
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
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="number"
                label="shortcode"
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
            <Grid item sm={6}>
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
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Bank Postcode"
                type="number"
                name="bank_postcode"
                value={companyData.bank_postcode}
                onChange={(e) =>
                  dispatchCompany({
                    type: "bank_postcode",
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
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Agent Email"
                name="agent_email"
                value={companyData.agent_email}
                onChange={(e) =>
                  dispatchCompany({
                    type: "agent_email",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel id="loa-template-label">LOA Template</InputLabel>
                <Select
                  labelId="loa-template-label"
                  label="LOA Template"
                  name="loa_template"
                  value={companyData.loa_template}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "loa_template",
                      value: e.target.value,
                    })
                  }
                >
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
                name="loa_start_date"
                value={companyData.loa_start_date}
                onChange={(e) =>
                  dispatchCompany({
                    type: "loa_start_date",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="LOA End Date"
                name="loa_end_date"
                value={companyData.loa_end_date}
                onChange={(e) =>
                  dispatchCompany({
                    type: "loa_end_date",
                    value: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <>
            <Grid item sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    name="primary_contact"
                    checked={companyData.primary_contact}
                    onChange={(e) => {
                      dispatchCompany({
                        type: "primary_contact",
                        value: e.target.checked,
                      });
                    }}
                  />
                }
                label="Primary Contact"
              />
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item sm={6}>
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
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Contact Name"
                  name="contact_name"
                  value={companyData.contact_name}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "contact_name",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Job Title"
                  name="job_title"
                  value={companyData.job_title}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "job_title",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Direct Line"
                  name="direct_line"
                  value={companyData.direct_line}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "direct_line",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="number"
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
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Mobile"
                  name="mobile"
                  value={companyData.mobile}
                  onChange={(e) =>
                    dispatchCompany({
                      type: "mobile",
                      value: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
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
            <Typography variant="h6" mt={2}>
              Marketing Preferences (Optional)
            </Typography>
            <Box display="flex" flexWrap="wrap">
              <Grid item sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="email"
                      checked={companyData.email}
                      onChange={(e) => {
                        dispatchCompany({
                          type: "email",
                          value: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Email"
                />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="phone"
                      checked={companyData.phone}
                      onChange={(e) => {
                        dispatchCompany({
                          type: "phone",
                          value: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Phone"
                />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="sms"
                      checked={companyData.sms}
                      onChange={(e) => {
                        dispatchCompany({
                          type: "sms",
                          value: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="SMS"
                />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="post"
                      checked={companyData.post}
                      onChange={(e) => {
                        dispatchCompany({
                          type: "post",
                          value: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="Post"
                />
              </Grid>
            </Box>
          </>
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
          Create Company
        </Typography>
        {/* <TextField
          sx={{ m: 2 }}
          label="Postcode"
          // value={postcode}
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
        /> */}
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
      </Dialog>
    </Container>
  );
};

export default AddCompany;
