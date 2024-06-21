import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/SideBar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import theme from './components/UI/Theme';
import SiteList from './components/Site/SiteList';
import CompanyList from './components/Company/CompanyList';
import GenerateQuote from './components/GeneralQuote/GenerateQuote';
import CompanyDashboard from './components/CompanyDashboard/CompanyDashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar toggleSidebar={toggleSidebar} />
        <div style={{ display: 'flex' }}>
          <Sidebar isOpen={isSidebarOpen} />
          <main style={{ flexGrow: 1, padding: '16px', width: isSidebarOpen ? 240 : '100%' }}>
            <Routes>
              <Route path="/" element={<Dashboard isOpen={isSidebarOpen} />} />
              <Route path="/sites" element={<SiteList />} />
              <Route path="/company" element={<CompanyList onCompanyClick={handleCompanyClick} />} />
              <Route path="/generate-quote" element={<GenerateQuote />} />
              <Route path="/CompanyDashboard" element={<CompanyDashboard />} />

            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;

