import {baseUrl} from '@app/globalVars';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import instance from '@app/utils/axios';

const UpdatePenaltyForm = () => {
  const updatePenaltyApi = `${baseUrl}/library/penalty`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(penalty, ownerEmail);
    instance
      .post(updatePenaltyApi, {
        userEmail: ownerEmail,
        penalty
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        setPenalty(0);
        setOwnerEmail('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePenalty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPenalty(parseInt(event.target.value, 10));
  };
  const handleChangeOwnerEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOwnerEmail(event.target.value);
  };
  const [penalty, setPenalty] = useState(0);
  const [ownerEmail, setOwnerEmail] = useState('');

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
          id="penalty"
          label="Penalty"
          value={penalty}
          onChange={handleChangePenalty}
        />
        <TextField
          id="ownerEmail"
          label="User Email"
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

export default UpdatePenaltyForm;
