import React, {useEffect} from 'react';
import {baseUrl} from '@app/globalVars';
import {GridColDef, DataGrid, GridSelectionModel} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import axios from 'axios';

const BookList = ({getSelection}: any) => {
  const [selection, setSelection] = React.useState<GridSelectionModel>([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const token: string = useSelector((state: any) => state.auth.token);
  const getBooksApi = `${baseUrl}/books`;

  const handleSelection = (newSelection: any) => {
    setSelection(newSelection);
    const selectedIds = new Set(newSelection);
    const selectedRows = rows.filter((row: any) => {
      return selectedIds.has(row.bookId);
    });
    // console.log(selectedRows);
    getSelection(selectedRows);
  };

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
        const sampleData = {
          bookId: '',
          libraryBookNumber: 0,
          bookName: '',
          maximumDaysAllowed: 0,
          isAvailableToIssue: false,
          ownerData: ''
        };
        Object.keys(sampleData).forEach((key) => {
          console.log(key);
          columns.push({
            field: key,
            headerName: key,
            width: 200
          });
        });
        // tempArr created because we cannot directly print ownerData which is a {}.
        // mapped over whole data, and replaced the {} with userEmail so that the grid can render it
        const tempArr = jsonObjArr.map((obj: any) => {
          if (obj.ownerData != null) {
            obj.ownerData = obj.ownerData.email;
          }
          return obj;
        });
        setRows(tempArr);
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
      checkboxSelection
      density="compact"
      rows={rows}
      columns={columns}
      getRowId={(row) => row.bookId}
      loading={loading}
      selectionModel={selection}
      onSelectionModelChange={handleSelection}
    />
  );
};

export default BookList;
