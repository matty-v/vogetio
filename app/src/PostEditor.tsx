import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './PostEditor.css';
import { getUser } from './auth-service';
import { createPost, fetchPostById, Post, PostEdit, updatePost } from './posts-service';

const showdown  = require('showdown');
const showdownHighlight = require("showdown-highlight")

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

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true
      })
    ]
  });

  const [lastSaved, setLastSaved] = useState(Date.now);
  const [inPreview, setInPreview] = useState(false);
  const [user] = useState(getUser());
  const [post, setPost] = useState({ title: '', caption: '', content: '' } as PostEdit)

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

  useEffect(() => {
    if (post.title !== '' && (Date.now() - lastSaved) > 10000 ) {
      updatePost(user, postId, post)
      .then((updatedPost: Post) => {
        if (!updatedPost.id) {
          navigate('/admin-login');
        }
        console.log(`Post was auto-saved at ${(new Date()).toLocaleTimeString()}`);
        setLastSaved(Date.now());
      });
    }
  }, [post]);

  const createOrUpdatePost = () => {
    if (postId === 'create') {
      createPost(user, post)
      .then((createdPost: Post) => {
        navigate('/blog-admin');
      });
    } else {
      updatePost(user, postId, post)
      .then((updatedPost: Post) => {
        navigate('/blog-admin');
      });
    }
  };

  return (
    <>
      <h1>Post Editor</h1>
      { inPreview
        ? // Preview Mode
        <>
          <Typography variant="h2" component="div" sx={{ color: 'white' }}>
            {post.title}
          </Typography>
          <hr/>
          <div className="row">
            <div id="post-content">
              { ReactHtmlParser(converter.makeHtml(post.content)) }
            </div>
          </div>
        </>

        : // Edit Mode
        <>
          <div className="row">
            <TextField label="Title"
              value={post.title}
              onChange={e => setPost({ title: e.target.value, caption: post.caption, content: post.content } as PostEdit)}
              id="outlined-basic"
              variant="outlined"
              classes={classes}
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ input: { color: 'white' } }}
            />
          </div>
          <div className="row">
            <TextField label="Caption"
              value={post.caption}
              onChange={e => setPost({ title: post.title, caption: e.target.value, content: post.content } as PostEdit)}
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
              onChange={e => setPost({ title: post.title, caption: post.caption, content: e.target.value } as PostEdit)}
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
        </>
      }

      <div className="row">
        <div className="button-row">
          <Button variant="contained" onClick={createOrUpdatePost}>Save</Button>
          <Button variant="outlined" onClick={() => setInPreview(!inPreview)} sx={{ marginLeft: '10px' }}>{ inPreview ? 'Edit' : 'Preview' }</Button>
          <Typography component="div" sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="secondary" onClick={() => navigate('/blog-admin')}>Cancel</Button>
        </div>
      </div>
    </>
  )
});
