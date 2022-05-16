import {Button, TextField} from '@mui/material';
import React, {useState} from 'react';
import {baseUrl} from '@app/globalVars';
import {useSelector} from 'react-redux';
import axios from 'axios';

const UserLibraryForm = ({getSelectedUser}: any) => {
  const [user, setUser] = useState('');
  const [userList, setUserList] = useState([]);
  const [totalPenalty, setTotalPenalty] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const token: string = useSelector((state: any) => state.auth.token);
  const userLibraryApi = `${baseUrl}/library?userId=${user}`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .get(userLibraryApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setUserList(response.data.data.userBookDataList);
        getSelectedUser(user);
        setTotalPenalty(response.data.penalty);
        console.log(response);
        console.log(totalPenalty);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setUser('');
  };
  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
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
          id="userEmail"
          label="User Email"
          value={user}
          onChange={handleChangeUser}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      {submitted && (
        <>
          <div>
            {userList.map((userBookData: any) => {
              return (
                <p key={userBookData.libraryBookNumber}>
                  {userBookData.libraryBookNumber}
                </p>
              );
            })}
          </div>
          <p>Total penalty = {totalPenalty}</p>
        </>
      )}
    </>
  );
};

export default UserLibraryForm;
