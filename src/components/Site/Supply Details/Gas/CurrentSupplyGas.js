import {
  Grid,
  TextField,
  Box,
  Switch,
  FormControlLabel,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialCSG = {
  g_supplier: "",
  g_product: "",
  g_contract_type: "",
  g_won_date: moment().format("YYYY-MM-DD"),
  g_contract_start_date: moment().format("YYYY-MM-DD"),
  g_contract_end_date: moment().format("YYYY-MM-DD"),
  g_contract_length_months: "",
  g_contract_back_date: moment().format("YYYY-MM-DD"),
  g_supplier_reference: "",
  g_supplier_information1: "",
  g_supplier_information2: "",
  g_supplier_information3: "",
  g_agent: false,
  g_customer: false,
  stading_charge: "",
  standing_charge_uplift: "",
  unit_rate_uplift: "",
  rate: "",
  annual_usage: "",
};

const reducerCSG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialCSG;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CurrentSupplyGas = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [CSGasData, dispatchCSGasData] = useReducer(reducerCSG, initialCSG);
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const resetReducerForm = () => {
    dispatchCSGasData({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      if (siteId) {
        try {
          const response = await ajaxCall(
            `supply/current-supply/${siteId}/`,
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
          if (response.status === 200) {
            const responseData = {
              g_supplier: response.data.g_supplier,
              g_product: response.data.g_product,
              g_contract_type: response.data.g_contract_type,
              g_won_date: response.data.g_won_date,
              g_contract_start_date: response.data.g_contract_start_date,
              g_contract_end_date: response.data.g_contract_end_date,
              g_contract_length_months: response.data.g_contract_length_months,
              g_contract_back_date: response.data.g_contract_back_date,
              g_supplier_reference: response.data.g_supplier_reference,
              g_supplier_information1: response.data.g_supplier_information1,
              g_supplier_information2: response.data.g_supplier_information2,
              g_supplier_information3: response.data.g_supplier_information3,
              g_agent: response.data.g_agent,
              g_customer: response.data.g_customer,
              stading_charge: response.data.gas_usage_rate.stading_charge,
              standing_charge_uplift:
                response.data.gas_usage_rate.standing_charge_uplift,
              unit_rate_uplift: response.data.gas_usage_rate.unit_rate_uplift,
              rate: response.data.gas_usage_rate.rate,
              annual_usage: response.data.gas_usage_rate.annual_usage,
            };
            dispatchCSGasData({ type: "reset", payload: responseData });
          }
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [siteId]);

  const doCSGas = async (e) => {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      g_supplier: CSGasData.g_supplier,
      g_product: CSGasData.g_product,
      g_contract_type: CSGasData.g_contract_type,
      g_won_date: CSGasData.g_won_date,
      g_contract_start_date: CSGasData.g_contract_start_date,
      g_contract_end_date: CSGasData.g_contract_end_date,
      g_contract_length_months: CSGasData.g_contract_length_months,
      g_contract_back_date: CSGasData.g_contract_back_date,
      g_supplier_reference: CSGasData.g_supplier_reference,
      g_supplier_information1: CSGasData.g_supplier_information1,
      g_supplier_information2: CSGasData.g_supplier_information2,
      g_supplier_information3: CSGasData.g_supplier_information3,
      g_agent: CSGasData.g_agent,
      g_customer: CSGasData.g_customer,
    };
    const gasUsageRate = {
      gas_usage_rate: {
        stading_charge: CSGasData.stading_charge,
        standing_charge_uplift: CSGasData.standing_charge_uplift,
        unit_rate_uplift: CSGasData.unit_rate_uplift,
        rate: CSGasData.rate,
        annual_usage: CSGasData.annual_usage,
      },
    };
    if (
      gasUsageRate.gas_usage_rate.stading_charge ||
      gasUsageRate.gas_usage_rate.standing_charge_uplift ||
      gasUsageRate.gas_usage_rate.rate ||
      gasUsageRate.gas_usage_rate.unit_rate_uplift ||
      gasUsageRate.gas_usage_rate.annual_usage
    ) {
      sendData = { ...sendData, ...gasUsageRate };
    }
    try {
      const response = await ajaxCall(
        `supply/current-supply/${siteId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "PATCH",
          body: JSON.stringify(sendData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        navigate("/sites");
        resetReducerForm();
        toast.success("Current Supply For GAS Edited Successfully");
      } else if ([400, 404, 401].includes(response.status)) {
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

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Supplier"
            name="g_supplier"
            type="text"
            value={CSGasData.g_supplier}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_supplier",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Product"
            name="g_product"
            type="text"
            value={CSGasData.g_product}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_product",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contract Type"
            name="g_contract_type"
            type="text"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Won Date"
            type="date"
            name="g_won_date"
            value={CSGasData.g_won_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_won_date",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Contract Start Date"
            name="g_contract_start_date"
            value={CSGasData.g_contract_start_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_start_date",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contract End Date"
            type="date"
            name="g_contract_end_date"
            value={CSGasData.g_contract_end_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_end_date",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contract Length (Months)"
            type="number"
            name="g_contract_length_months"
            value={CSGasData.g_contract_length_months}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_length_months",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contract Back Date"
            type="date"
            name="g_contract_back_date"
            value={CSGasData.g_contract_back_date}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_contract_back_date",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Supplier Reference"
            type="text"
            name="g_supplier_reference"
            value={CSGasData.g_supplier_reference}
            onChange={(e) =>
              dispatchCSGasData({
                type: "g_supplier_reference",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Supplier Information 1"
            type="text"
            name="g_supplier_information1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Supplier Information 2"
            type="text"
            name="g_supplier_information2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Supplier Information 3"
            type="text"
            name="g_supplier_information3"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Notice of termination for this contract sent by:
          </Typography>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={CSGasData.g_agent}
                    onChange={(e) => {
                      dispatchCSGasData({
                        type: "g_agent",
                        value: e.target.checked,
                      });
                    }}
                    name="g_agent"
                  />
                }
                label="Agent"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={CSGasData.g_customer}
                    onChange={(e) => {
                      dispatchCSGasData({
                        type: "g_customer",
                        value: e.target.checked,
                      });
                    }}
                    name="g_customer"
                  />
                }
                label="Customer"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          Usage and Rates
        </Button>
      </Box>
      {open && (
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Standing Charge (pence/day)"
                name="stading_charge"
                type="number"
                value={CSGasData.stading_charge}
                onChange={(e) => {
                  dispatchCSGasData({
                    type: "stading_charge",
                    value: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Standing Charge Uplift(pence/day)"
                name="standing_charge_uplift"
                type="number"
                value={CSGasData.standing_charge_uplift}
                onChange={(e) => {
                  dispatchCSGasData({
                    type: "standing_charge_uplift",
                    value: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rate (pence/kwh)"
                name="rate"
                type="number"
                value={CSGasData.rate}
                onChange={(e) => {
                  dispatchCSGasData({
                    type: "rate",
                    value: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Rate Uplift"
                name="unit_rate_uplift"
                type="number"
                value={CSGasData.unit_rate_uplift}
                onChange={(e) => {
                  dispatchCSGasData({
                    type: "unit_rate_uplift",
                    value: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Usage (KWH)"
                name="annual_usage"
                type="number"
                value={CSGasData.annual_usage}
                onChange={(e) => {
                  dispatchCSGasData({
                    type: "annual_usage",
                    value: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography>Total Commission (£) : 0.00</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography>Annual Commission (£) : 0.00</Typography>
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
          onClick={doCSGas}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CurrentSupplyGas;
