import { useState, useEffect } from 'react';

import { Post, fetchPublishedPosts } from './posts-service';
import './Home.css';
import { PostCard } from './PostCard';

export function Home() {

  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    fetchPublishedPosts().then((data: Post[]) => {
      setPosts(data);
    });
  }, []);

  return (
    <>
      <div id="profile-row" className="row">
        <div id="profile-pic" className="col">
          <img src="assets/profile-pic.jpeg" alt="profile"/>
        </div>
        <div className="col">
          <div id="about-me-content">
            <div><i className="fa fa-code"></i>Full Stack Engineer</div>
            <div><i className="fa fa-users"></i>Team Lead</div>
            <div><i className="fa fa-heart"></i>Dad</div>
          </div>
        </div>
        <div id="hello-content" className="col">
          <div id="hello-text">
            Hello, World!
          </div>
          <div id="hello-subtext">
            You've found Matt Voget's personal site.<br/><br/>
            <strong>Coming soon:</strong> blog featuring software projects, book reviews, and anything else I find interesting!<br/>
            Until then, check out my <a href="https://github.com/matty-v">GitHub</a> or <a href="https://www.linkedin.com/in/matthew-voget-47a225a1/">LinkedIn</a>
          </div>
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
            editMode={false}
            user={null}
          />
        ))}
      </div>
    </>
  );

}
