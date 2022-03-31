import React, {useEffect} from 'react';
import {baseUrl} from '@app/globalVars';
import {GridColDef, DataGrid} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import axios from 'axios';

const BookList = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const token: string = useSelector((state: any) => state.auth.token);
  const getBooksApi = `${baseUrl}/courses`;

  useEffect(() => {
    axios
      .get(getBooksApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
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
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DataGrid
      autoHeight
      density="compact"
      rows={rows}
      columns={columns}
      getRowId={(row) => row.code}
      loading={loading}
    />
  );
};

export default BookList;
