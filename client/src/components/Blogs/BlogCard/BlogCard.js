import * as React from 'react';
import './BlogCard.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import BlogsAvatar from './blogs.png';
const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function BlogCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ width: 300, height: 300, textAlign: 'center' }}>
      <CardMedia
        component="img"
        alt="listing card"
        margin="auto"
        height="55%"
        width="80%"
        image={BlogsAvatar}
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          {props.blogInfo.title}
        </Typography>
        <Typography variant="body2" align='center'>
          Author: {props.blogInfo.userName}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="cardAction">
          <Button onClick={handleOpen} size="medium">View</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalSx}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Title: {props.blogInfo.title}
              </Typography>
              <Typography id="modal-modal-title" sx={{ mt: 2 }}>
                Author: {props.blogInfo.userName}
              </Typography>
              <Typography id="modal-modal-title" sx={{ mt: 2 }}>
                Created On: {new Date(props.blogInfo.createdAt)
                    .toLocaleDateString('en-US', options)}
              </Typography>
              <hr></hr>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.blogInfo.content}
              </Typography>
            </Box>
          </Modal>
        </div>
      </CardActions>
    </Card>
  );
}
export default BlogCard;
