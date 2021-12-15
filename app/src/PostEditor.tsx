import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './PostEditor.css';
import { getUser } from './auth-service';
import { savePost, Post } from './posts-service';

const styles = {
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'white',
      },
      '&:hover fieldset': {
          borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
          borderColor: 'white',
      },
    },
  },
  multilineColor:{
    color: 'white'
  }
};

export const PostEditor = withStyles(styles)(function(props: any) {

  const { classes } = props;

  const [user] = useState(getUser());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get('postId');

  const navigate = useNavigate();

  const updatePost = () => {
    savePost(user, { title, content })
    .then((createdPost: Post) => {
      console.log(createdPost);
      navigate('/blog-admin');
    });
  };

  return (
    <>
      <h1>Post Editor</h1>
      {user
        ? // Logged In
        <div>
          <div className="row">
            <TextField label="Title"
              onChange={e => setTitle(e.target.value)}
              id="outlined-basic"
              variant="outlined"
              classes={classes}
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ input: { color: 'white' } }}
            />
          </div>
          <div className="row">
            <TextField label="Content"
              onChange={e => setContent(e.target.value)}
              id="outlined-basic"
              variant="outlined"
              classes={classes}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                className: classes.multilineColor
              }}
              multiline
              rows={8}
            />
          </div>
          <div className="row">
            <div>
              <Button variant="contained" onClick={updatePost}>Save</Button>
            </div>
          </div>
        </div>

        : // Logged Out
        <h1>Nothing to see here...</h1>
      }
    </>
  )
});
