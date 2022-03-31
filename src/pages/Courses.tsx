/* eslint-disable jsx-a11y/anchor-is-valid */
// import {ContentHeader} from '@components';
import CourseList from '@app/components/courseList/CourseList';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CourseForm from '@app/components/courseForm/CourseForm';
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

const Courses = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="View Courses" />
        <Tab label="Add a course" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div style={{height: 'auto', width: '100%'}}>
          <CourseList />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CourseForm />
      </TabPanel>
    </>
  );
};

export default Courses;
