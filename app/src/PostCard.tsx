import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router-dom";


export function PostCard(props: { postId: string; title: string; content: string, editMode: boolean }) {

  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        { props.editMode
          ? // Nav to editor
          <Button size="small" onClick={() => navigate(`/post-editor?postId=${props.postId}`)}>Edit</Button>
          : // Read full post
          <Button size="small">Read</Button>
        }
      </CardActions>
    </Card>
  );
}
