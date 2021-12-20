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
import { useNavigate } from "react-router-dom";
import './PostCard.css';
import { User } from './auth-service';
import { deletePost, updatePost, Post } from './posts-service';

export function PostCard(props: {
  postId: string;
  title: string;
  content: string,
  isPinned: string,
  isPublished: string,
  editMode: boolean,
  deleteCallback: (postId: string, title: string) => void,
  user: User | null
}) {

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
    <Card sx={{ maxWidth: 500, backgroundColor: '#3c3c3c' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: 'white' }}>
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5, color: 'white', minHeight: 100 }} color="text.secondary">
          {props.content}
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
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => props.deleteCallback(props.postId, props.title)}>
              Delete
            </Button>
          </>
          : // Read full post
          <Button size="small">Read</Button>
        }
      </CardActions>
    </Card>
  );
}
