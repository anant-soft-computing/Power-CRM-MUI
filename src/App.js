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
import Test from "./components/Quote/Test";

function App() {
  const location = useLocation();
  const hide =
    location.pathname === "/" || location.pathname.startsWith("/Test/");
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
            <Route path="/Company/:companyId" element={<CompanyDashboard />} />
            <Route path="/Sites" element={<Site />} />
            <Route path="/Site/:siteId" element={<SiteDashboard />} />
            <Route path="/Quotes" element={<Quote />} />
            <Route path="/Test/:siteId" element={<Test />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
