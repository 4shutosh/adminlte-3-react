import {baseUrl} from '@app/globalVars';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, {useState} from 'react';
import QRCode from 'react-qr-code';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';

const CourseForm = () => {
  const token: string = useSelector((state: any) => state.auth.token);
  const header = {
    Authorization: `Bearer ${token}`
  };
  const addBookApi = `${baseUrl}/courses/insert`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(courseName, courseCode);
    axios
      .post(
        addBookApi,
        {
          courseFacultyName,
          courseCode,
          courseName,
          courseDescription
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
        setcourseFacultyName('');
        setCourseName('');
        setCourseCode('');
        setCourseDescription('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeCourseName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseName(event.target.value);
  };
  const handleChangeCourseCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseCode(event.target.value);
  };
  const handleChangeCourseFacultyName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setcourseFacultyName(event.target.value);
  };
  const handleChangeCourseDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCourseDescription(event.target.value);
  };
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseFacultyName, setcourseFacultyName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [submittedCorrectly, setSubmittedCorrectly] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          margin: '-10px',
          padding: '-10px'
        }}
      >
        <TextField
          id="courseName"
          label="Course Name"
          value={courseName}
          onChange={handleChangeCourseName}
        />
        <TextField
          id="courseCode"
          label="Course Code"
          value={courseCode}
          onChange={handleChangeCourseCode}
        />
        <TextField
          id="courseFacultyName"
          label="Faculty Name"
          value={courseFacultyName}
          onChange={handleChangeCourseFacultyName}
        />
        <TextField
          id="courseDescription"
          label="Course Description"
          value={courseDescription}
          onChange={handleChangeCourseDescription}
        />
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
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
            value={`${courseFacultyName} ${courseName} ${courseCode}`}
            size={256}
          />
        )}
      </div>
    </>
  );
};

export default CourseForm;
