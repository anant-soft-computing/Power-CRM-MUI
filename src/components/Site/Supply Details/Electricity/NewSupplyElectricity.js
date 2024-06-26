import { Grid, TextField, Box, Switch, FormControlLabel, Button, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

const initialState = {
  e_supplier: "",
  e_product: "",
  e_contract_type: "",
  e_won_date: moment().format("YYYY-MM-DD"),
  e_contract_start_date: moment().format("YYYY-MM-DD"),
  e_contract_end_date: moment().format("YYYY-MM-DD"),
  e_contract_length_months: "",
  e_contract_back_date: moment().format("YYYY-MM-DD"),
  e_supplier_reference: "",
  e_supplier_information1: "",
  e_supplier_information2: "",
  e_supplier_information3: "",
  e_notes: "",
  e_agent: false,
  e_customer: false,
  stading_charge: "",
  standing_charge_uplift: "",
  kva_rate: "",
  unit_rate_uplift: "",
  feed_in_tariff: "",
  annual_day_usage: "",
  day_rate: "",
  annual_night_usage: "",
  night_rate: "",
  annual_evening_usage: "",
  evening_rate: "",
};

const NewSupplyElectricity = () => {
  const [formData, setFormData] = useState(initialState);
  const [showUsageRatesForm, setShowUsageRatesForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = "https://aumhealthresort.com/powercrm/api/company/";
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(apiURL, requestOptions);
      if (response.status === 201) {
        console.log(response);
      } else {
        console.log("--error---->");
      }
    } catch (error) {
      console.log("--error---->");
    }
  };

  return (
    <Box mb={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier"
              name="e_supplier"
              type="text"
              value={formData.e_supplier}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product"
              name="e_product"
              type="text"
              value={formData.e_product}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract Type"
              name="e_contract_type"
              type="text"
              value={formData.e_contract_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Won Date"
              type="date"
              name="e_won_date"
              value={formData.e_won_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Contract Start Date"
              name="e_contract_start_date"
              value={formData.e_contract_start_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract End Date"
              type="date"
              name="e_contract_end_date"
              value={formData.e_contract_end_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract Length (Months)"
              type="number"
              name="e_contract_length_months"
              value={formData.e_contract_length_months}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract Back Date"
              type="date"
              name="e_contract_back_date"
              value={formData.e_contract_back_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Reference"
              type="text"
              name="e_supplier_reference"
              value={formData.e_supplier_reference}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Information 1"
              type="text"
              name="e_supplier_information1"
              value={formData.e_supplier_information1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Information 2"
              type="text"
              name="e_supplier_information2"
              value={formData.e_supplier_information2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Information 3"
              type="text"
              name="e_supplier_information3"
              value={formData.e_supplier_information3}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Notes"
              type="text"
              name="e_notes"
              value={formData.e_notes}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.e_agent}
                      onChange={handleChange}
                      name="e_agent"
                    />
                  }
                  label="Agent"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.e_customer}
                      onChange={handleChange}
                      name="e_customer"
                    />
                  }
                  label="Customer"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowUsageRatesForm((prev) => !prev)}
          >
            Usage and Rates
          </Button>
        </Box>
        {showUsageRatesForm && (
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Standing Charge(pence/day)"
                  name="stading_charge"
                  type="number"
                  value={formData.stading_charge}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Standing Charge Uplift(pence/day)"
                  name="standing_charge_uplift"
                  type="number"
                  value={formData.standing_charge_uplift}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="KVA Rate(pence/kwh)"
                  name="kva_rate"
                  type="number"
                  value={formData.kva_rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Unit Rate Uplift"
                  name="unit_rate_uplift"
                  type="number"
                  value={formData.unit_rate_uplift}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Feed-in Tariff(FiT)"
                  name="feed_in_tariff"
                  type="number"
                  value={formData.feed_in_tariff}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Day Usage(kwh)"
                  name="annual_day_usage"
                  type="number"
                  value={formData.annual_day_usage}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Day Rate(kwh)"
                  name="day_rate"
                  type="number"
                  value={formData.day_rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Night Usage(kwh)"
                  name="annual_night_usage"
                  type="number"
                  value={formData.annual_night_usage}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Night Rate(pence/kwh)"
                  name="night_rate"
                  type="number"
                  value={formData.night_rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Evening/Weekend Usage"
                  name="annual_evening_usage"
                  type="number"
                  value={formData.annual_evening_usage}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Evening/Weekend Rate(pence/kWh)"
                  name="evening_rate"
                  type="number"
                  value={formData.evening_rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Total Annual Usage (£) : 0.00
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Total Commission (£) : 0.00
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Annual Commission (£) : 0.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Box>
        )}

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewSupplyElectricity;
