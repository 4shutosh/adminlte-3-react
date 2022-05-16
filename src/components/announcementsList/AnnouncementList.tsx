import React, {useEffect} from 'react';
import {baseUrl} from '@app/globalVars';
import {GridColDef, DataGrid, GridSelectionModel} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import axios from 'axios';

const AnnouncementsList = ({getSelection}: any) => {
  const [selection, setSelection] = React.useState<GridSelectionModel>([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const token: string = useSelector((state: any) => state.auth.token);
  const getBooksApi = `${baseUrl}/announcements`;

  const handleSelection = (newSelection: any) => {
    setSelection(newSelection);
    const selectedIds = new Set(newSelection);
    const selectedRows = rows.filter((row: any) => {
      return selectedIds.has(row.announcementId);
    });
    console.log(selectedRows);
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
      getRowId={(row) => row.announcementId}
      loading={loading}
      selectionModel={selection}
      onSelectionModelChange={handleSelection}
    />
  );
};

export default AnnouncementsList;
