import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/SideBar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import theme from "./components/UI/Theme";
import Site from "./components/Site/Site";
import Company from "./components/Company/Company";
import QuoteList from "./components/GeneralQuote/QuoteList";
import Login from "./components/LogIn/Login";
import CompanyDashboard from "./components/Company/Dashboard";
import SiteDashboard from "./components/Site/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const hideComponents = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      {!hideComponents && <Navbar toggleSidebar={toggleSidebar} />}
      <div style={{ display: "flex" }}>
        {!hideComponents && <Sidebar isOpen={isSidebarOpen} />}
        <main
          style={{
            flexGrow: 1,
            padding: "16px",
            width: isSidebarOpen ? "calc(100% - 240px)" : "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Companies" element={<Company />} />
            <Route element={<CompanyDashboard />} path="/Company/:companyId" />
            <Route path="/Sites" element={<Site />} />
            <Route path="/Site/:siteId" element={<SiteDashboard />} />
            <Route path="/Quotes" element={<QuoteList />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
