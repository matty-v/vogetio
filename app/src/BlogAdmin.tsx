import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

import './BlogAdmin.css';
import { getUser } from './auth-service';
import { fetchPosts, deletePost, Post } from './posts-service';
import { PostCard } from './PostCard';

export function BlogAdmin() {
  const navigate = useNavigate();

  const [user] = useState(getUser());
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    fetchPosts(user).then((data: Post[]) => {
      setPosts(data);

      if (!user) {
        navigate('/admin-login');
      }
    });
  }, []);

  const removePost = (postId: string, title: string) => {
    const yes = confirm(`Are you sure you want to delete post [${title}]? This cannot be undone!`);

    if (!yes) return;

    deletePost(user, postId)
    .then((deletedPost: Post) => {
      console.log(`Deleted Post: ${JSON.stringify(deletedPost)}`);
      setPosts(posts.filter((post: Post) => {
        return post.id !== postId;
      }));
    })
  };

  const navToPostEditor = () => {
    navigate('/post-editor?postId=create');
  };

  return (
    <>
      <h1>Blog Administration</h1>
      <div id="logged-in-content">
        <div className="row">
          <div className="col">
            <p>Hello {user?.profile.name}!</p>
          </div>
          <div className="col">
            <Button color="primary" variant="contained" sx={{ float: 'right', marginRight: '50px' }} startIcon={<AddIcon />} onClick={navToPostEditor}>Create Post</Button>
          </div>
        </div>
        <hr/>
        <div className="row">
          {posts && posts.map((post: Post) => (
            <PostCard
              key={post.id}
              postId={post.id}
              title={post.title}
              content={post.content}
              isPinned={post.pinned}
              isPublished={post.published}
              lastUpdated={post.updatedAt}
              editMode={true}
              deleteCallback={removePost}
              user={user}
            />
          ))}
        </div>
      </div>
    </>
  )
}
