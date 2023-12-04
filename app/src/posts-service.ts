import axios from "axios";
import { Post } from "./types";

const SERVER_URL = process.env.BLOG_SERVICE_URL ?? '';

export const fetchPublishedPosts = async (): Promise<Post[]> => {

  let posts: Post[] = [];

  try {
    const response = await axios({
      url: SERVER_URL,
      method: 'get'
    });
    posts = response.data;
  } catch (e) {
    console.log(`Failed to fetch posts!`);
    console.error(e);
  }

  return posts;

}

export const fetchPostById = async (postId: string): Promise<Post> => {

  let post;

  try {
    const response = await axios({
      url: `${SERVER_URL}/${postId}`,
      method: 'get'
    });
    post = response.data;
  } catch (e) {
    console.log(`Failed to fetch post with ID [${postId}]!`);
    console.error(e);
  }

  return post;
}

export const fetchPostContent = async (postId: string): Promise<string> => {

  let content;

  try {
    const response = await axios({
      url: `${SERVER_URL}/${postId}/content`,
      method: 'get'
    });
    content = response.data.content;
  } catch (e) {
    console.log(`Failed to fetch post content with ID [${postId}]!`);
    console.error(e);
  }

  return content;
}
