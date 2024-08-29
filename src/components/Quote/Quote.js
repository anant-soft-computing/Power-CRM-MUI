import React, { useEffect, useState } from "react";
import { Container, Card } from "@mui/material";
import GenerateQuote from "./GenerateQuote";
import ajaxCall from "../../helpers/ajaxCall";
import "../../css/custom.css";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

const Quote = () => {
  const navigate = useNavigate();
  const [site, setSite] = useState("");
  const [siteData, setSiteData] = useState([]);
  const [quoteData, setQuoteData] = useState([]);
  const filteredQuoteData = quoteData.filter((item) => item.site === site);

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
    fetchData(`sites/get/site/`, setSiteData);
  }, []);

  useEffect(() => {
    fetchData("supplierdatagetview/", setQuoteData);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 10 }}>
      <Breadcrumb
        title="Generate Quotes"
        middleUrl="Companies"
        middle="Company"
        main="Dashboard"
      />
      <Card sx={{ mt: 3, boxShadow: 5, borderRadius: 3 }}>
        <GenerateQuote />
      </Card>
    </Container>
  );
};

export default Quote;
