import {baseUrl} from '@app/globalVars';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import instance from '@app/utils/axios';

const CourseForm = () => {
  const addBookApi = `${baseUrl}/courses/insert`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(courseName, courseCode);
    instance
      .post(addBookApi, {
        courseFacultyName,
        courseCode,
        courseName,
        courseDescription
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          toast.success(response.data.message);
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
    </>
  );
};

export default CourseForm;
