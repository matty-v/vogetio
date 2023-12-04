import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import HTMLReactParser from 'html-react-parser';
import Typography from '@mui/material/Typography';
import { fetchPostById, fetchPostContent } from '../utils/posts-service';
import { LoaderPayload, Post } from '../types';
import Loader from '../common/Loader';
import { Events, broadcast } from '../utils/broadcaster';

import './PostReader.css';

const showdown  = require('showdown');

export function PostReader() {

  const [post, setPost] = useState({} as Post);
  const { id } = useParams();
  const postId = id ?? '';

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
        <></>
      }
      <Loader/>
    </>
  )
};
