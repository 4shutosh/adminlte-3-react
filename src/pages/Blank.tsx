/* eslint-disable jsx-a11y/anchor-is-valid */
// import {ContentHeader} from '@components';
import BookList from '@app/components/bookList/BookList';
import * as React from 'react';
// import {Grid} from '@mui/material';

const Blank = () => {
  console.log('blank');
  return (
    <div style={{height: 300, width: '100%'}}>
      <BookList />
    </div>
  );
};

export default Blank;
