import React, {useEffect} from 'react';
import {baseUrl} from '@app/globalVars';
import {GridColDef, DataGrid} from '@mui/x-data-grid';
import axios from 'axios';

// const rows: GridRowsProp = [
//   {id: 1, col1: 'Hello', col2: 'World'},
//   {id: 2, col1: 'DataGridPro', col2: 'is Awesome'},
//   {id: 3, col1: 'MUI', col2: 'is Amazing'}
// ];

// const columns: GridColDef[] = [
//   {field: 'col1', headerName: 'Column 1', width: 150},
//   {field: 'col2', headerName: 'Column 2', width: 150}
// ];

const BookList = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const token = localStorage.getItem('token');
  const getBooksApi = `${baseUrl}/books`;

  useEffect(() => {
    axios
      .get(getBooksApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        const columns: GridColDef[] = [];
        const jsonObjArr = response.data.data;
        const sampleData = jsonObjArr[0];
        Object.keys(sampleData).forEach((key) => {
          columns.push({
            field: key,
            headerName: key,
            width: 200
          });
        });
        setRows(jsonObjArr);
        setColumns(columns);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <DataGrid
      density="compact"
      rows={rows}
      columns={columns}
      getRowId={(row) => row.bookId}
      loading={loading}
    />
  );
};

export default BookList;
