import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import SupplyDetails from "./Supply Details/SupplyDetails";
import ajaxCall from "../../helpers/ajaxCall";
import "../../css/custom.css";

const SiteDashboard = () => {
  const { siteId } = useParams();
  const [value, setValue] = useState(0);
  const [siteData, setSiteData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [siteQuotes, setSiteQuotes] = useState([]);
  const [siteDocument, setSiteDocument] = useState([]);

  const quotes = siteQuotes.filter((item) => item.site === parseInt(siteId));
  const siteDataWithId = { ...siteData, id: siteData.site_id || 1 };

  const SiteColumn = [
    {
      headerName: "Site Name",
      field: "site_name",
      width: 150,
      filter: true,
    },
    {
      headerName: "Lead Type",
      field: "lead_type",
      width: 150,
      filter: true,
    },
    {
      headerName: "Owner Name",
      field: "owner_name",
      width: 130,
      filter: true,
    },
    {
      headerName: "Agent Email",
      field: "agent_email",
      width: 150,
      filter: true,
    },
    {
      headerName: "Billing Address",
      field: "billing_address",
      width: 150,
      filter: true,
      renderCell: (params) => params.value?.addressline1 || "N/A",
    },
    {
      headerName: "Contacts",
      field: "contacts",
      width: 140,
      filter: true,
      renderCell: (params) => params.value?.telephone_number || "N/A",
    },
    {
      headerName: "Current Supply",
      field: "current_gas_and_electricity_supplier_details",
      width: 140,
    },
    {
      headerName: "Notes",
      field: "notes",
      width: 130,
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasChanged = params.props.value !== params.row.notes;
        if (hasChanged) {
          handleNotesUpdate({ id: params.row.id, value: params.props.value });
        }
        return { ...params.props, error: false };
      },
    },
    {
      headerName: "Site Document",
      field: "siteDocument",
      width: 190,
      renderCell: (params) => {
        const document = siteDocument.find((doc) => doc.site === params.row.id);
        return document ? (
          <Button href={document.document} variant="contained" color="primary">
            {"View Document"}
          </Button>
        ) : (
          "N/A"
        );
      },
    },
  ];

  const columns = [
    {
      headerName: "Supplier",
      field: "supplier",
      filter: true,
    },
    {
      headerName: "Term",
      field: "term",
      filter: true,
    },
    {
      headerName: "Day Rate (pence/kWh)",
      field: "day_rate",
      filter: true,
    },
    {
      headerName: "Night Rate (pence/kWh)",
      field: "night_rate",
      filter: true,
      width: 210,
    },
    {
      headerName: "Standing Charge (pence)",
      field: "standing_charge",
      filter: true,
      width: 210,
    },
    {
      headerName: "Up Lift",
      field: "up_lift",
      filter: true,
    },
  ];

  const handleNotesUpdate = async (params) => {
    const { id, value } = params;
    try {
      const response = await ajaxCall(
        `sites/update/site/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          body: JSON.stringify({ notes: value }),
        },
        8000
      );

      if (response?.status === 200) {
        setSiteData((prevData) => ({
          ...prevData,
          notes: value,
        }));
        toast.success("Notes Updated ");
      } else {
        toast.error("Notes Not Updated");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
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
        setData(response?.data);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData(`sites/update/site/${siteId}/`, setSiteData);
  }, [siteId]);

  useEffect(() => {
    setIsLoading(true);
    fetchData("supplierdatagetview", setSiteQuotes).finally(() =>
      setIsLoading(false)
    );
  }, []);

  useEffect(() => {
    fetchData(`site-document/`, setSiteDocument);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb
        title={siteData?.site_name}
        middle="Site"
        middleUrl="Sites"
        main="Dashboard"
      />
      <Card sx={{ p: 2, m: 2, boxShadow: 5, borderRadius: 3 }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="company dashboard tabs"
          >
            <Tab label="Site Details" />
            <Tab label="Quotes" />
            <Tab label="Supply Details" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              value === 0 && (
                <>
                  <Box sx={{ height: "100%", width: "100%" }}>
                    <DataGrid
                      rows={[siteDataWithId]}
                      columns={SiteColumn}
                      disableColumnFilter
                      disableDensitySelector
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
                </>
              )
            )}
            {value === 1 && (
              <>
                {quotes.length > 0 ? (
                  <Box sx={{ height: "100%", width: "100%" }}>
                    <DataGrid
                      rows={quotes}
                      columns={columns}
                      disableColumnFilter
                      disableDensitySelector
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
                ) : (
                  <Typography
                    color="error"
                    sx={{ mt: 2 }}
                    align="center"
                    variant="h6"
                    component="div"
                  >
                    {`No Quotes Available For This ${siteData.site_name} Site !!`}
                  </Typography>
                )}
              </>
            )}
            {value === 2 && (
              <SupplyDetails
                leadType={siteData.lead_type}
                MpanID={siteData.mpan_id}
              />
            )}
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default SiteDashboard;
