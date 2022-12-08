import { Box } from '@mui/material';
import * as React from 'react';
import './Home.scss';
import HomeTile from './HomeTile/HomeTile';
import {
  Link,
} from 'react-router-dom';

function Home() {
  return (
    <Box sx={{ flexGrow: 1, padding: '5%', display: 'flex',
      justifyContent: 'center', gap: '5%' }}>
      <Link to='/roommate' className='home-link-class' underline='none'>
        <HomeTile title={'Roommate Finder'} type={'roommate'}/>
      </Link>

      {/* <HomeTile title={'Project Finder'} type={'project'}/> */}
      <Link to='/blogs' style={{ textDecoration: 'none' }} underline='none' color={'white'}>
        <HomeTile title={'Blogs'} type={'blogs'} />
      </Link>
    </Box>
  );
}

export default Home;
