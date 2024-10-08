import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/SideBar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import theme from "./components/UI/Theme";
import Site from "./components/Site/Site";
import Company from "./components/Company/Company";
import Quote from "./components/Quote/Quote";
import Login from "./components/LogIn/Login";
import CompanyDashboard from "./components/Company/Dashboard";
import SiteDashboard from "./components/Site/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Document from "./components/Documents/GeneralDocuments";
import MultiSite from "./components/MultiSite-MultiQuotes/MultiSite";
import MultiQuote from "./components/MultiSite-MultiQuotes/MultiQuote";
import CompanyDocument from "./components/Documents/CompanyDocument";
import SiteDocument from "./components/Documents/SiteDocument";
import AddCompany from "./components/Company/AddCompany";
import SendQuotation from "./components/Quote/SendQuotation";
import GeneralDocuments from "./components/Documents/GeneralDocuments";

function App() {
  const location = useLocation();
  const hide =
    location.pathname === "/" ||
    location.pathname.startsWith("/SendQuotation/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      {!hide && <Navbar toggleSidebar={toggleSidebar} />}
      <div style={{ display: "flex" }}>
        {!hide && <Sidebar isOpen={isSidebarOpen} />}
        <div
          style={
            !hide
              ? {
                  flexGrow: 1,
                  transition: "margin-left 0.2s ease",
                  width: isSidebarOpen ? "calc(100% - 240px)" : "100%",
                  marginLeft: isSidebarOpen ? "240px" : "0",
                  backgroundColor: "#f0f2f5",
                }
              : { flexGrow: 1 }
          }
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Companies" element={<Company />} />
            <Route path="/AddCompany" element={<AddCompany />} />
            <Route path="/ViewCompany" element={<Dashboard />} />
            <Route path="/Company/:companyId" element={<CompanyDashboard />} />
            <Route path="/CompanyDocument/" element={<CompanyDocument />} />
            <Route
              path="/CompanyDocument/:DocumentId"
              element={<CompanyDocument />}
            />
            <Route path="/SiteDocument/" element={<SiteDocument />} />
            <Route
              path="/SiteDocument/:SiteDocumentID"
              element={<SiteDocument />}
            />
            <Route path="/GeneralDocuments" element={<GeneralDocuments />} />
            <Route path="/Sites" element={<Site />} />
            <Route path="/Site/:siteId" element={<SiteDashboard />} />
            <Route path="/Quotes" element={<Quote />} />
            <Route path="/Documents" element={<Document />} />
            <Route path="/MultiSites" element={<MultiSite />} />
            <Route path="/MultiQuotes" element={<MultiQuote />} />
            <Route path="/SendQuotation/:siteId" element={<SendQuotation />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
