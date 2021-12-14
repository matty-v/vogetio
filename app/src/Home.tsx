import React, { useState, useEffect } from 'react';

import './Home.css';
const SERVER_URL = process.env.SERVER_URL;

export function Home() {
  let [posts]: any = useState();

  posts = [];

  useEffect(() => {
    // fetch(`${SERVER_URL}/api/posts`, {
    //   mode: 'cors',
    //   headers: {
    //     'Access-Control-Allow-Origin':'*'
    //   }
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);
    //   posts = data;
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  });

  return (
    <>
      <div className="row">
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
      <div className="row content-row">
        <div className="col">
        {/* {posts.map((post: any) => (
          <div key={post.id}>
            <li>{post.id}</li>
            <li>{post.title}</li>
            <li>{post.content}</li>
          </div>
        ))} */}
        </div>
      </div>
    </>
  );

}
