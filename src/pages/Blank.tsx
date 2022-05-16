/* eslint-disable jsx-a11y/anchor-is-valid */
// import {ContentHeader} from '@components';
import BookList from '@app/components/bookList/BookList';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BookForm from '@app/components/bookForm/BookForm';
import Button from '@mui/material/Button';
import QRCode from 'react-qr-code';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import UserLibraryForm from '@app/components/userLibrary/UserLibraryForm';
import UserList from '@app/components/userList/UserList';
import {baseUrl} from '@app/globalVars';
import instance from '@app/utils/axios';
import {toast} from 'react-toastify';

// import {Grid} from '@mui/material';

function TabPanel(props: any) {
  const {children, value, index, ...other} = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const QrElement = ({book}: {book: any}) => {
  return (
    <div>
      <Stack>
        <QRCode
          value={`
              {
                  "identifier": "69694242",
                  "data": "${book.libraryBookNumber}"
              }`}
          size={128}
        />
        <p>{book.bookName}</p>
      </Stack>
    </div>
  );
};

const QrGrid = React.forwardRef(
  ({selectedData}: {selectedData: Object[]}, ref) => {
    const gridCore = selectedData.map((book: any) => {
      return (
        <Grid item key={book.libraryBookNumber} xs={2}>
          <QrElement book={book} />
        </Grid>
      );
    });
    return (
      <div style={{display: 'none'}}>
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <Grid container spacing={2}>
            {gridCore}
          </Grid>
        </div>
      </div>
    );
  }
);

const Blank = () => {
  const QrRef = useRef(null);
  const [value, setValue] = React.useState(0);
  const [selectedData, setSelectedData] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [temp, setTemp] = React.useState(0);

  const handlePrintQR = () => {};
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const getSelectionDatafromGrid = (selectionDataFromGrid: any) => {
    setSelectedData(selectionDataFromGrid);
    // console.log(selectedData);
  };

  const getSelectedUser = (data: any) => {
    setSelectedUser(data);
  };

  const handleReturn = (event: any) => {
    event.preventDefault();
    const returnApi = `${baseUrl}/library/return`;
    selectedData.forEach((book: any) => {
      console.log(book);
      instance
        .post(returnApi, {
          libraryBookNumber: book.libraryBookNumber,
          userEmail: selectedUser
        })
        .then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            setTemp(temp + 1);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="View Books" />
        <Tab label="Add a book" />
        <Tab label="Return a book" />
        <Tab label="User Library" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div
          style={{
            height: 'auto',
            width: '100%'
          }}
        >
          <BookList getSelection={getSelectionDatafromGrid} />
          <ReactToPrint
            trigger={() => (
              <Button variant="contained" onClick={handlePrintQR}>
                Print QR
              </Button>
            )}
            content={() => QrRef.current}
          />
          <QrGrid selectedData={selectedData} ref={QrRef} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserLibraryForm getSelectedUser={getSelectedUser} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        {selectedUser && (
          <UserList
            key={temp}
            getSelection={getSelectionDatafromGrid}
            selectedUser={selectedUser}
          />
        )}
        <Button variant="contained" onClick={handleReturn}>
          Return Selected books
        </Button>
      </TabPanel>
    </>
  );
};

export default Blank;
