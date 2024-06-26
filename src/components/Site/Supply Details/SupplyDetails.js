import React, { useEffect, useState } from "react";
import MeterDetailGas from "./Gas/MeterDetailGas";
import CurrentSupplyGas from "./Gas/CurrentSupplyGas";
import NewSupplyGas from "./Gas/NewSupplyGas";
import MeterDetailElectricity from "./Electricity/MeterDetailElectricity";
import CurrentSupplyElectricity from "./Electricity/CurrentSupplyElectricity";
import NewSupplyElectricity from "./Electricity/NewSupplyElectricity";
import { Tabs, Tab, Box, Typography } from "@mui/material";

const SupplyDetail = ({ leadType, MpanID }) => {
  const defaultTab = leadType === "GAS" ? "mGas" : "mElectricity";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [gasDetails, setGasDetails] = useState([]);
  const [electricityDetails, setElectricityDetails] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://aumhealthresort.com/powercrm/api/lookup/Property/SearchByPropertyAddressId/",
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
              query: MpanID,
              isQueryTicket: true,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (leadType === "GAS") {
            setGasDetails(data.gasInfo);
          } else {
            setElectricityDetails(data.elecInfo[0]);
          }
        } else {
          console.error("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, [leadType, MpanID]);

  const gasTabs = [
    {
      id: "mGas",
      title: "Meter Details",
      component: <MeterDetailGas gasDetails={gasDetails} />,
    },
    {
      id: "cGas",
      title: "Current Supply",
      component: <CurrentSupplyGas gasDetails={gasDetails} />,
    },
    {
      id: "nGas",
      title: "New Supply",
      component: <NewSupplyGas />,
    },
  ];

  const electricityTabs = [
    {
      id: "mElectricity",
      title: "Meter Details",
      component: <MeterDetailElectricity EleDetails={electricityDetails} />,
    },
    {
      id: "cElectricity",
      title: "Current Supply",
      component: <CurrentSupplyElectricity EleDetails={electricityDetails} />,
    },
    {
      id: "nElectricity",
      title: "New Supply",
      component: <NewSupplyElectricity />,
    },
  ];

  const tabs = leadType === "GAS" ? gasTabs : electricityTabs;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="supply details tabs"
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.title} value={tab.id} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={activeTab} index={tab.id}>
          {tab.component}
        </TabPanel>
      ))}
    </>
  );
};

export default SupplyDetail;
