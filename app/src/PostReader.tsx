import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import Typography from '@mui/material/Typography';

import './PostReader.css';
import { fetchPostById, fetchPostContent } from './posts-service';
import HTMLReactParser from 'html-react-parser';
import { LoaderPayload, Post } from './types';
import Loader from './Loader';
import { Events, broadcast } from './broadcaster';

const showdown  = require('showdown');

export function PostReader() {

  const [post, setPost] = useState({} as Post);

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get('postId') || '';

  const converter = new showdown.Converter();

  const convertToReactComponents = (markdown: string) => {
    return HTMLReactParser(converter.makeHtml(markdown));
  }

  useEffect(() => {
    broadcast<LoaderPayload>(Events.UpdateLoader, { Enabled: true });
    fetchPostById(postId).then((p: Post) => {
      fetchPostContent(postId).then((content: string) => {
        const currentPost: Post = {
          id: p.id,
          caption: p.caption,
          createdAt: p.createdAt,
          pinned: p.pinned,
          published: p.published,
          title: p.title,
          updatedAt: p.updatedAt,
          content
        }
        setPost(currentPost);
        broadcast<LoaderPayload>(Events.UpdateLoader, { Enabled: false });
      });
    });
  }, []);

  return (
    <>
      { post.content?.length > 0 ?
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
              { post.content ? convertToReactComponents(post.content) : '' }
            </div>
          </div>
        </>
        :
        <>

        </>
      }
      <Loader/>
    </>
  )
};
