import {baseUrl} from '@app/globalVars';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {toast} from 'react-toastify';
import React, {useState} from 'react';
import instance from '@app/utils/axios';

const AddAnnouncementForm = () => {
  const addAnnouncementApi = `${baseUrl}/announcements/insert`;
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(announcementTitle, announcementMessage);
    instance
      .post(addAnnouncementApi, {
        message: announcementMessage,
        title: announcementTitle,
        link: announcementLink,
        timestamp: new Date().getTime()
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        setAnnouncementTitle('');
        setAnnouncementMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncementTitle(event.target.value);
  };
  const handleChangeMaxDays = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncementMessage(event.target.value);
  };
  const handleAnnouncementLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnnouncementLink(event.target.value);
  };

  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementLink, setAnnouncementLink] = useState('');

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
          id="title"
          label="Announcement Title"
          value={announcementTitle}
          onChange={handleChangeBookName}
        />
        <TextField
          id="message"
          label="Announcement Message"
          value={announcementMessage}
          onChange={handleChangeMaxDays}
        />
        <TextField
          id="link"
          label="Link"
          value={announcementLink}
          onChange={handleAnnouncementLinkChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddAnnouncementForm;
