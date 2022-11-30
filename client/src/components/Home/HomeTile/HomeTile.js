import './HomeTile.scss';
import * as React from 'react';
import { Paper, Button } from '@mui/material';
import { useState } from 'react';
import roommateImage from './roommate.png';
import projectImage from './project.gif';
import blogsImage from './blogs.png';

function HomeTile(props) {
  const [values, setValues] = useState({
    elevationValue: 1,
  });
  const increaseElevation = () => {
    setValues({ elevationValue: 24 });
  };
  const decreaseElevation = () => {
    setValues({ elevationValue: 4 });
  };

  const getTitleImage = () => {
    if (props.type === 'roommate') return roommateImage;
    else if (props.type === 'project') return projectImage;
    return blogsImage;
  };

  return (
    <Paper
      textAlign={'center'}
      onMouseOver={increaseElevation}
      onMouseOut={decreaseElevation}
      elevation={values.elevationValue}
      sx={{
        'width': 300,
        'height': 300,
      }}
    >
      <div style={{ 'text-align': 'center' }}>
        <img src={getTitleImage()} width={'70%'}></img>
        <h3>{props.title}</h3>
      </div>
      <div style={{ 'text-align': 'center' }}>
        <Button variant="outlined">
          {props.type === 'blogs' ? 'View' : 'Join'}
        </Button>
      </div>
    </Paper>
  );
}

export default HomeTile;
