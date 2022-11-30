import { Box } from '@mui/material';
import * as React from 'react';
import './Home.scss';
import HomeTile from './HomeTile/HomeTile';

function Home() {
  return (
    <Box sx={{ flexGrow: 1, padding: '5%', display: 'flex',
      justifyContent: 'center', gap: '5%' }}>
      <HomeTile title={'Roommate Finder'} type={'roommate'}/>
      <HomeTile title={'Project Finder'} type={'project'}/>
      <HomeTile title={'Blogs'} type={'blogs'} />
    </Box>
  );
}

export default Home;
