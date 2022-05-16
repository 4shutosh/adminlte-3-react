import AddAnnouncementForm from '@app/components/addAnnouncementForm/AddAnnouncementForm';
import AnnouncementsList from '@app/components/announcementsList/AnnouncementList';
import {baseUrl} from '@app/globalVars';
import {Box, Button, Tabs, Typography} from '@mui/material';
import Tab from '@mui/material/Tab';
import React from 'react';
import {toast} from 'react-toastify';
import instance from '@app/utils/axios';

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

const Announcements = () => {
  const [value, setValue] = React.useState(0);
  const [temp, setTemp] = React.useState(0);
  const [selectedData, setSelectedData] = React.useState([]);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const getSelectionDatafromGrid = (selectionDataFromGrid: any) => {
    setSelectedData(selectionDataFromGrid);
    console.log(selectedData);
  };
  const handleRemove = () => {
    const removeApi = `${baseUrl}/announcements/delete?announcementId=`;
    selectedData.forEach((element: any) => {
      instance
        .post(removeApi + element.announcementId)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            toast.success(res.data.message);
            setTemp(temp + 1);
          } else toast.error(res.data.message);
        })
        .catch((err) => {
          console.log(err);
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
        <Tab label="View Announcements" />
        <Tab label="Add an Announcement" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div
          style={{
            height: 'auto',
            width: '100%'
          }}
        >
          <AnnouncementsList
            key={temp}
            getSelection={getSelectionDatafromGrid}
          />
          <Button variant="contained" onClick={handleRemove}>
            Remove Selected Announcements
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddAnnouncementForm />
      </TabPanel>
    </>
  );
};

export default Announcements;
