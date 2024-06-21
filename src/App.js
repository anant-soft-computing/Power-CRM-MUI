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

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flexGrow: 1, padding: '16px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sites" element={<SiteList />} />
              <Route path="/company" element={<CompanyList onCompanyClick={handleCompanyClick} />} />
              <Route path="/generate-quote" element={<GenerateQuote />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>

  );
}

export default App;

