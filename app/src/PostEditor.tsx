import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './PostEditor.css';
import { getUser } from './auth-service';
import { createPost, deletePost, fetchPostById, Post, PostEdit, updatePost } from './posts-service';

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
  const [post, setPost] = useState({ title: '', content: ''} as PostEdit)

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get('postId') || '';

  const navigate = useNavigate();

  useEffect(() => {
    fetchPostById(user, postId).then((data: Post) => {
      setPost(data as PostEdit);

      if (!user) {
        navigate('/admin-login');
      }
    });
  }, []);

  const createOrUpdatePost = () => {
    if (postId === 'create') {
      createPost(user, post)
      .then((createdPost: Post) => {
        console.log(`Created Post: ${JSON.stringify(createdPost)}`);
        navigate('/blog-admin');
      });
    } else {
      updatePost(user, postId, post)
      .then((updatedPost: Post) => {
        console.log(`Updated Post: ${JSON.stringify(updatedPost)}`);
        navigate('/blog-admin');
      });
    }
  };

  const removePost = () => {

    const yes = confirm(`Are you sure you want to delete post [${post.title}]? This cannot be undone!`);

    if (!yes) return;

    deletePost(user, postId)
    .then((deletedPost: Post) => {
      console.log(`Deleted Post: ${JSON.stringify(deletedPost)}`);
      navigate('/blog-admin');
    })
  }

  return (
    <>
      <h1>Post Editor</h1>
      <div className="row">
        <TextField label="Title"
          value={post.title}
          onChange={e => setPost({ title: e.target.value, content: post.content } as PostEdit)}
          id="outlined-basic"
          variant="outlined"
          classes={classes}
          InputLabelProps={{ style: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
      </div>
      <div className="row">
        <TextField label="Content"
          value={post.content}
          onChange={e => setPost({ title: post.title, content: e.target.value } as PostEdit)}
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
          <Button variant="contained" onClick={createOrUpdatePost}>Save</Button>
          <Button variant="outlined" onClick={removePost}>Remove</Button>
        </div>
      </div>
    </>
  )
});
