import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";
import moment from "moment";
import Quotation from "./Quotation";
import ajaxCall from "../../helpers/ajaxCall";

const initialQuoteState = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  postcode: "",
  g_mpr: "",
  e_meter_type: "",
  credit_score: 0,
  custom_end_date: moment().format("YYYY-MM-DD"),
  measurement_class: "",
  payment_method: "MONTHLY DIRECT DEBIT",
  current_supplier: "",
  renewal_date: moment().format("YYYY-MM-DD"),
  unit_rate_uplift: "MAXIMUM",
  invariable_uplift: 0,
  annual_day_usage: 0,
  day_rate: 0,
  feed_in_tariff: 0,
  standing_charge: 0,
  annual_usage: 0,
};

const steps = [
  "Basic Details",
  "Usage Details",
  "Contract Details",
  "Additional Details",
];

const paymentMethods = [
  { value: "MONTHLY DIRECT DEBIT", label: "Monthly Direct Debit" },
  { value: "QUARTERLY DIRECT DEBIT", label: "Quarterly Direct Debit" },
  { value: "CASH CHEQUE", label: "Cash / Cheque" },
  { value: "VARIALBE DIRECT DEBIT", label: "Variable Direct Debit" },
  { value: "BACS", label: "BACS" },
  { value: "PREPAYEMENT", label: "PrePayment" },
  { value: "UNSPECIFIED", label: "Unspecified" },
];

const unitRateUplifts = [
  { value: "MAXIMUM", label: "Maximum" },
  { value: "MINIMUM", label: "Minimum" },
  { value: "INVARIABLE", label: "Invariable" },
];

const GenerateQuote = () => {
  const [siteId, setSiteId] = useState("");
  const [siteData, setSiteData] = useState([]);
  const [leadType, setLeadType] = useState("ELECTRICITY");
  const [activeStep, setActiveStep] = useState(0);
  const [showQuotation, setShowQuotation] = useState(false);
  const [quoteData, setQuoteData] = useState(initialQuoteState);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "sites/get/site/",
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
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!siteId) return;
    const fetchSiteDetails = async () => {
      try {
        const response = await fetch(
          `https://aumhealthresort.com/powercrm/api/sites/extra-details/${siteId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeadType(data?.lead_type);
        const newData = {
          postcode: data?.basic_detail?.postcode || "",
          e_mpan_topline: data?.basic_detail?.e_mpan_topline || "",
          e_mpan_bottomline: data?.basic_detail?.e_mpan_bottomline || "",
          g_mpr: data?.basic_detail?.g_mpr || "",
          e_meter_type: data?.basic_detail?.e_meter_type || "",
          credit_score: data?.additional_detail?.credit_score || 0,
          custom_end_date:
            data?.additional_detail?.custom_end_date ||
            moment().format("YYYY-MM-DD"),
          measurement_class: data?.additional_detail?.measurement_class || "",
          current_supplier: data?.contract_detail?.current_supplier || "",
          payment_method:
            data?.contract_detail?.payment_method || "MONTHLY DIRECT DEBIT",
          renewal_date:
            data?.contract_detail?.renewal_date ||
            moment().format("YYYY-MM-DD"),
          unit_rate_uplift:
            data?.contract_detail?.unit_rate_uplift || "MAXIMUM",
          invariable_uplift: data?.contract_detail?.invariable_uplift || 0,
          annual_day_usage: data?.usage_detail?.annual_day_usage || 0,
          day_rate: data?.usage_detail?.day_rate || 0,
          feed_in_tariff: data?.usage_detail?.feed_in_tariff || 0,
          standing_charge: data?.usage_detail?.stading_charge || 0,
          annual_usage: data?.usage_detail?.annual_usage || 0,
        };

        setQuoteData(newData);
      } catch (error) {
        console.error("Error fetching site details:", error);
      }
    };
    fetchSiteDetails();
  }, [siteId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        contract_detail: {
          payment_method: quoteData.payment_method,
          renewal_date: quoteData.renewal_date,
          unit_rate_uplift: quoteData.unit_rate_uplift,
          invariable_uplift: quoteData.invariable_uplift,
        },
        additional_detail: {
          credit_score: quoteData.credit_score,
          custom_end_date: quoteData.custom_end_date,
          measurement_class: quoteData.measurement_class,
        },
        usage_detail: {
          annual_day_usage: quoteData.annual_day_usage,
          day_rate: quoteData.day_rate,
          feed_in_tariff: quoteData.feed_in_tariff,
          standing_charge: quoteData.standing_charge,
          annual_usage: quoteData.annual_usage,
        },
      };
      const response = await fetch(
        `https://aumhealthresort.com/powercrm/api/sites/extra-details/${siteId}/`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          body: JSON.stringify(sendData),
        }
      );
      if (response.ok) {
        setShowQuotation(true);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData({
      ...quoteData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="site-label">Site Name</InputLabel>
                <Select
                  labelId="site-label"
                  label="Site Name"
                  name="site_name"
                  value={siteId}
                  onChange={(e) => setSiteId(e.target.value)}
                >
                  {siteData.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.site_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postcode"
                name="postcode"
                value={quoteData.postcode}
                onChange={handleChange}
              />
            </Grid>
            {leadType === "GAS" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="G MPR"
                  name="g_mpr"
                  value={quoteData.g_mpr}
                  onChange={handleChange}
                />
              </Grid>
            )}
            {leadType === "ELECTRICITY" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E MPAN Topline"
                    name="e_mpan_topline"
                    value={quoteData.e_mpan_topline}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E MPAN Bottomline"
                    name="e_mpan_bottomline"
                    value={quoteData.e_mpan_bottomline}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Credit Score"
                type="number"
                name="credit_score"
                value={quoteData.credit_score}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Custom End Date"
                type="date"
                name="custom_end_date"
                value={quoteData.custom_end_date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Measurement Class"
                name="measurement_class"
                value={quoteData.measurement_class}
                onChange={handleChange}
              />
            </Grid>
            {leadType === "ELECTRICITY" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E Meter Type"
                  name="e_meter_type"
                  value={quoteData.e_meter_type}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="site-label">Payment Method</InputLabel>
                <Select
                  labelId="payment-method-label"
                  label="Payment Method"
                  name="payment_method"
                  value={quoteData.payment_method}
                  onChange={handleChange}
                >
                  {paymentMethods.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Supplier"
                name="current_supplier"
                value={quoteData.current_supplier}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Renewal Date"
                type="date"
                name="renewal_date"
                value={quoteData.renewal_date}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="unit-rate-uplift-label">
                  Unit Rate Uplift
                </InputLabel>
                <Select
                  labelId="unit-rate-uplift-label"
                  label="Unit Rate Uplift"
                  name="unit_rate_uplift"
                  value={quoteData.unit_rate_uplift}
                  onChange={handleChange}
                >
                  {unitRateUplifts.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Invariable Uplift"
                type="number"
                name="invariable_uplift"
                value={quoteData.invariable_uplift}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Day Usage"
                type="number"
                name="annual_day_usage"
                value={quoteData.annual_day_usage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Day Rate"
                type="number"
                name="day_rate"
                value={quoteData.day_rate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Feed-in Tariff"
                type="number"
                name="feed_in_tariff"
                value={quoteData.feed_in_tariff}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Standing Charge"
                type="number"
                name="standing_charge"
                value={quoteData.standing_charge}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Usage"
                type="number"
                name="annual_usage"
                value={quoteData.annual_usage}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h6" padding={1} margin={1}>
          Generate Quote
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleOnSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Container>
      {showQuotation && (
        <Quotation
          siteId={siteId}
          upLiftRate={quoteData.invariable_uplift}
          setShowQuotation={setShowQuotation}
        />
      )}
    </>
  );
};

export default GenerateQuote;
