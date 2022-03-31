import {baseUrl} from '@app/globalVars';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import QRCode from 'react-qr-code';
import {useSelector} from 'react-redux';

const BookForm = () => {
  const token: string = useSelector((state: any) => state.auth.token);
  const header = {
    Authorization: `Bearer ${token}`
  };
  const addBookApi = `${baseUrl}/books/insert`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(bookName, maxDaysAllowed);
    axios
      .post(
        addBookApi,
        {
          libraryBookNumber,
          daysAllowed: maxDaysAllowed,
          bookName
        },
        {headers: header}
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          toast.success(response.data.message);
          setSubmittedCorrectly(true);
        } else {
          toast.error(response.data.message);
        }
        setLibraryBookNumber(0);
        setBookName('');
        setMaxDaysAllowed(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value);
  };
  const handleChangeMaxDays = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDaysAllowed(parseInt(event.target.value, 10));
  };
  const handleChangeLibraryBookNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLibraryBookNumber(parseInt(event.target.value, 10));
  };
  const [bookName, setBookName] = useState('');
  const [maxDaysAllowed, setMaxDaysAllowed] = useState(0);
  const [libraryBookNumber, setLibraryBookNumber] = useState(0);
  const [submittedCorrectly, setSubmittedCorrectly] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TextField
          id="bookName"
          label="Book Name"
          value={bookName}
          onChange={handleChangeBookName}
        />
        <TextField
          id="maxDaysAllowed"
          label="Max Days Allowed to Borrow"
          value={maxDaysAllowed}
          onChange={handleChangeMaxDays}
        />
        <TextField
          id="libraryBookNumber"
          label="Library Book Number"
          value={libraryBookNumber}
          onChange={handleChangeLibraryBookNumber}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {submittedCorrectly && (
          <QRCode
            style={{alignSelf: 'center', margin: '20 auto'}}
            value={`${libraryBookNumber} ${bookName} ${maxDaysAllowed}`}
            size={256}
          />
        )}
      </div>
    </>
  );
};

export default BookForm;
