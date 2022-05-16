import React, {useEffect} from 'react';
import {baseUrl} from '@app/globalVars';
import {GridColDef, DataGrid, GridSelectionModel} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import axios from 'axios';

const UserList = ({getSelection}: any, selectedUser: any) => {
  const [selection, setSelection] = React.useState<GridSelectionModel>([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const token: string = useSelector((state: any) => state.auth.token);
  console.log('in userlist main', selectedUser);
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
    console.log(selectedUser);
    const getUserDetailsApi = `${baseUrl}/library?userId=${selectedUser}`;
    axios
      .get(getUserDetailsApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(selectedUser, 'in then');
        const columns: GridColDef[] = [];
        console.log('in userlist', response);
        const jsonObjArr = response.data.data.userBookDataList;
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
  }, [selectedUser]);

  return (
    <>
      {selectedUser && (
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
      )}
    </>
  );
};
export default UserList;
