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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const hideComponents = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
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
            <Route path="/sites" element={<Site />} />
            <Route path="/company" element={<Company />} />
            <Route path="/generate-quote" element={<QuoteList />} />
            <Route
              path="/CompanyDashboard/:id"
              element={<CompanyDashboard />}
            />
            <Route path="/SiteDashboard/:id" element={<SiteDashboard />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
