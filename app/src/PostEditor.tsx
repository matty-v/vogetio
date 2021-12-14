import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';

import { useLocation } from "react-router-dom";

const SERVER_URL = process.env.SERVER_URL;

import './PostEditor.css';
import { getUser } from './auth-service';

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

  let [user] = useState();
  user = getUser();

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get('postId');
  console.log(postId);

  return (
    <>
      <h1>Post Editor</h1>
      {user
        ? // Logged In
        <div>
          <div className="row">
            <TextField label="Title"
              id="outlined-basic"
              variant="outlined"
              classes={classes}
              InputLabelProps={{ style: { color: 'white' } }}
              sx={{ input: { color: 'white' } }}
            />
          </div>
          <div className="row">
            <TextField label="Content"
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
        </div>

        : // Logged Out
        <h1>Nothing to see here...</h1>
      }
    </>
  )
});
