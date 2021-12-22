import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

import Typography from '@mui/material/Typography';

import { fetchPublishedPostById, Post } from './posts-service';

const showdown  = require('showdown');
const showdownHighlight = require("showdown-highlight")

export function PostReader() {

  const [post, setPost] = useState({} as Post);

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get('postId') || '';

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true
      })
    ]
  });

  useEffect(() => {
    fetchPublishedPostById(postId || '').then((p: Post) => {
      setPost(p);
    });
  }, []);

  return (
    <>
      { post['id']
        ? // Post exists
        <>
          <Typography variant="h2" component="div" sx={{ color: 'white' }}>
            {post.title}
          </Typography>
          <Typography component="div" sx={{ color: 'white', fontSize: 'small' }}>
            {new Date(Date.parse(post.updatedAt)).toLocaleString()}
          </Typography>
          <hr/>
          <div className="row">
            <div id="post-content">
              { ReactHtmlParser(converter.makeHtml(post.content)) }
            </div>
          </div>
        </>
        : // Post does not exist
        <></>
      }
    </>
  )
};
