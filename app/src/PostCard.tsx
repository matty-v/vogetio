import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from "react-router-dom";

import ReactHtmlParser from 'react-html-parser';
const showdown  = require('showdown');

import './PostCard.css';
import { User } from './auth-service';
import { updatePost, Post } from './posts-service';

export function PostCard(props: {
  postId: string;
  title: string;
  content: string,
  isPinned: string,
  isPublished: string,
  lastUpdated: string,
  editMode: boolean,
  deleteCallback?: (postId: string, title: string) => void,
  user: User | null
}) {

  const converter = new showdown.Converter();

  const navigate = useNavigate();

  const [isPinned, setIsPinned] = useState('false');
  const [isPublished, setIsPublished] = useState('false');

  useEffect(() => {
    setIsPinned(props.isPinned);
    setIsPublished(props.isPublished);
  }, []);

  const togglePin = () => {
    updatePost(props.user, props.postId, { pinned: isPinned ? 'false' : 'true' })
    .then((updatedPost: Post) => {
      console.log(`Updated Post: ${JSON.stringify(updatedPost)}`);
      setIsPinned(updatedPost.pinned);
    })
  };

  const togglePublished = () => {

    if (!isPublished) {
      const confirmed = confirm(`Are you sure you want to publish [${props.title}]?`);
      if (!confirmed) return;
    }

    updatePost(props.user, props.postId, { published: isPublished ? 'false' : 'true' })
    .then((updatedPost: Post) => {
      console.log(`Updated Post: ${JSON.stringify(updatedPost)}`);
      setIsPublished(updatedPost.published);
    })
  };

  return (
    <Card sx={{ maxWidth: '90%', width: '600px', margin: '20px', backgroundColor: '#3c3c3c' }}>
      <CardContent>
        <Typography variant="h3" component="div" sx={{ color: 'white' }}>
          {props.title}
        </Typography>
        <hr/>
        <Typography component="div" sx={{ mb: 1.5, color: '#bbbbbb', minHeight: 100, maxHeight: 100, overflow: 'hidden' }} color="text.secondary">
          <div id={`content-preview-${props.postId}`}>
            { ReactHtmlParser(converter.makeHtml(props.content)) }
          </div>
        </Typography>
        <Typography component="div" sx={{ color: '#8f8d8d', fontSize: 'large', marginLeft: '10px' }}>
          ...
        </Typography>
        <hr/>
        <Typography component="div" sx={{ color: 'white', fontSize: 'small' }}>
          {new Date(Date.parse(props.lastUpdated)).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        { props.editMode
          ? // Nav to editor
          <>
            <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => navigate(`/post-editor?postId=${props.postId}`)}>
              Edit
            </Button>
            { isPublished
              ? // Post is published
              <Button variant="contained" color="info" startIcon={<BookmarkIcon />} onClick={togglePublished}>
                Unpublish
              </Button>
              : // Post is not published
              <Button variant="outlined" color="info" startIcon={<BookmarkOutlinedIcon />} onClick={togglePublished}>
                Publish
              </Button>
            }
            { isPinned
              ? // Post is pinned
              <Button variant="contained" color="info" startIcon={<PushPinIcon sx={{ transform: 'rotate(90deg)' }} />} onClick={togglePin}>
                Unpin
              </Button>
              : // Post is not pinned
              <Button variant="outlined" color="info" startIcon={<PushPinIcon />} onClick={togglePin}>
                Pin
              </Button>
            }
            <Typography component="div" sx={{ flexGrow: 1 }} />
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => props.deleteCallback ? props.deleteCallback(props.postId, props.title) : () => {}}>
              Delete
            </Button>
          </>
          : // Read full post
          <Button variant="outlined" color="primary" startIcon={<MenuBookIcon />} onClick={() => navigate(`/post?postId=${props.postId}`)}>
            Read
          </Button>
        }
      </CardActions>
    </Card>
  );
}
