import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import { Login } from './Login';
import './BlogAdmin.css';
import { getUser } from './auth-service';
import { fetchPosts, Post } from './posts-service';
import { PostCard } from './PostCard';

export function BlogAdmin() {
  const [user, setUser] = useState(getUser());
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    fetchPosts(user).then((data: Post[]) => {
      setPosts(data);
    });
  }, []);

  const navigate = useNavigate();

  const navToPostEditor = () => {
    navigate('/post-editor?postId=create');
  };

  return (
    <>
      <h1>Blog Administration</h1>
      {user
        ? // Logged In
        <div id="logged-in-content">
          <div className="row">
            <p>Hello {user.profile.name}!</p>
          </div>
          <div className="row">
            <div className="col">
              <Button variant="contained" onClick={navToPostEditor}>Create Post</Button>
            </div>
          </div>
          <div className="row">
            {posts.map((post: Post) => (
              <PostCard key={post.id} title={post.title} content={post.content} />
            ))}
          </div>
        </div>

        : // Logged Out
        <div id="login-link">
          <Login rerenderParentCallback={() => setUser(getUser())} />
        </div>
      }
    </>
  )
}
