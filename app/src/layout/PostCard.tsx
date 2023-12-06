import MenuBookIcon from "@mui/icons-material/MenuBook";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

export function PostCard(props: {
  postId: string;
  title: string;
  caption: string;
  lastUpdated: string;
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: "90%",
        width: "600px",
        margin: "20px",
        backgroundColor: "#3c3c3c",
      }}
    >
      <CardContent>
        <Typography variant="h3" component="div" sx={{ color: "white" }}>
          {props.title}
        </Typography>
        <Typography
          component="div"
          sx={{
            mb: 1.5,
            color: "#bbbbbb",
            fontSize: "larger",
            marginTop: "10px",
          }}
        >
          {props.caption}
        </Typography>
        <hr />
        <Typography component="div" sx={{ color: "white", fontSize: "small" }}>
          {new Date(Date.parse(props.lastUpdated)).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<MenuBookIcon />}
          onClick={() => navigate(`/post/${props.postId}`)}
        >
          Read
        </Button>
      </CardActions>
    </Card>
  );
}
