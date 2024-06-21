import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { TextField, Box, IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const QuotesDataTable = ({ companyId, onEditQuote }) => {
  const [quotes, setQuotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    axios.get(`/api/quotes?companyId=${companyId}`)
      .then(response => {
        setQuotes(response.data);
        setFilteredQuotes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the quotes!', error);
      });
  }, [companyId]);

  useEffect(() => {
    setFilteredQuotes(
      quotes.filter(quote =>
        quote.quote_number.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, quotes]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: 'quote_number', headerName: 'Quote Number', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit Quote">
            <IconButton onClick={() => onEditQuote(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={filteredQuotes}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

function GridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default QuotesDataTable;
