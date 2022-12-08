import React, { useState, useEffect } from 'react';
import './Blogs.scss';
import BlogCard from './BlogCard/BlogCard';
import { Box } from '@mui/system';
import fetchAPI from '../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogList } from '../../redux/slices/blogSlice';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
function Blogs() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const [values, setValues] = useState({ title: '', content: '' });
  const [createBlog, setCreateBlog] = useState(false);
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogListing.blogList);
  const getAllListings = async () => {
    const response = await fetchAPI('/blog', 'GET', null, accessToken);
    return response;
  };

  useEffect(()=>{
    getAllListings().then((res) => {
      dispatch(setBlogList(res.data.blogs));
    });
  }, [] );

  const handleChange =
  (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleCreateBlog = () => {
    setValues({ title: '', content: '' });
    setCreateBlog(!createBlog);
  };
  const postBlog = async () => {
    const body = {
      title: values.title,
      content: values.content,
      userId: userInfo._id,
    };
    const response = await fetchAPI('/blog', 'post', body, accessToken);
    if (response.success) {
      getAllListings().then((res) => {
        dispatch(setBlogList(res.data.blogs));
      });
    };
    setValues({ title: '', content: '' });
    setCreateBlog(!createBlog);
  };
  return (
    <div>
      <br/>
      <Container width="100%" className='filter-container'>
        <Paper>
          <Button onClick={handleCreateBlog} size="large">Click To Create Blog</Button>
          {createBlog ? <div><div>
            <TextField
              label="Title"
              id="login-email-textfield"
              sx={{ m: 1, width: '40ch' }}
              value={values.title}
              onChange={handleChange('title')}
            />
          </div>
          <div>
            <TextField
              variant='outlined'
              size='large'
              label="Blog Content"
              id="login-email-textfield"
              sx={{ m: 1, width: '80ch' }}
              value={values.content}
              multiline
              rows={10}
              onChange={handleChange('content')}
            />
            <div><Button onClick={async ()=>{
              await postBlog();
            }} size="large">Submit</Button><Button onClick={handleCreateBlog} size="large">Cancel</Button></div>
          </div></div>: null}
        </Paper>
      </Container>
      <Container width="100%" className='filter-container'>
        <Paper elevation={24} className='filter-main-paper'>
          <br/>
          <div>
            <h2>Blogs</h2>
          </div>
          <br/>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '100px', justifyContent: 'space-around' }}>
            {blogList && blogList.length ? blogList.map( (blog, index)=>{
              return (
                <Paper key={index} elevation={24}>
                  <BlogCard blogInfo = {blog}/>
                </Paper>
              );
            } ): 'No listing'}
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Blogs;
