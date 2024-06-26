import { Grid, TextField, Box, Switch, FormControlLabel, Button } from "@mui/material";
import React, { useState } from "react";


const initialState = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  e_meter_type: "",
  e_serial_number: "",
  e_capacity: "",
  e_voltage: 0,
  e_measurement_class: "",
  e_smart_meter: false,
  e_related_meter: false,
  e_ley_meter: false,
  e_green_deal: false,
};

const MeterDetailElectricity = () => {
  const [formData, setFormData] = useState(initialState);

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
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
        }`,
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
              label="MPAN Top Line"
              name="e_mpan_topline"
              type="text"
              value={formData.e_mpan_topline}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="MPAN Bottom Line"
              name="e_mpan_bottomline"
              type="text"
              value={formData.e_mpan_bottomline}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Meter Type"
              name="e_meter_type"
              type="text"
              value={formData.e_meter_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Serial Number"
              type="text"
              name="e_serial_number"
              value={formData.e_serial_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Capacity (KVA)"
              name="e_capacity"
              value={formData.e_capacity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Voltage"
              type="number"
              name="e_voltage"
              value={formData.e_voltage}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Measurement Class"
              type="text"
              name="e_measurement_class"
              value={formData.e_measurement_class}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>

            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.e_smart_meter}
                      onChange={handleChange}
                      name="e_smart_meter"
                    />
                  }
                  label="Smart Meter (AMR)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.e_related_meter}
                      onChange={handleChange}
                      name="e_related_meter"
                    />
                  }
                  label="Related Meter"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.e_ley_meter}
                      onChange={handleChange}
                      name="e_ley_meter"
                    />
                  }
                  label="Key Meter"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.e_green_deal}
                      onChange={handleChange}
                      name="e_green_deal"
                    />
                  }
                  label="Green Deal"
                />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
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
  )
}

export default MeterDetailElectricity
