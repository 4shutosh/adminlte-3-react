import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import * as React from 'react';
import instance from '@app/utils/axios';
import {baseUrl} from '@app/globalVars';
import {toast} from 'react-toastify';

const ReturnBookForm = () => {
  const [bookNumber, setBookNumber] = useState(0);
  const [ownerEmail, setOwnerEmail] = useState('');
  const returnBookApi = `${baseUrl}/library/return`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(bookNumber, ownerEmail);
    instance
      .post(returnBookApi, {
        libraryBookNumber: bookNumber,
        userEmail: ownerEmail
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        setBookNumber(0);
        setOwnerEmail('');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangeBookNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBookNumber(parseInt(event.target.value, 10));
  };
  const handleChangeOwnerEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOwnerEmail(event.target.value);
  };

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
          id="bookNumber"
          label="Book Number"
          value={bookNumber}
          onChange={handleChangeBookNumber}
        />
        <TextField
          id="ownerEmail"
          label="Owner Email"
          value={ownerEmail}
          onChange={handleChangeOwnerEmail}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default ReturnBookForm;
