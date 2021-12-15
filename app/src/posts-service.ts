import { User } from "./auth-service";

const SERVER_URL = process.env.SERVER_URL;

export type PostEdit = {
  title: string;
  content: string;
}

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  published: boolean;
}

export const fetchPosts = (user: User | null): Promise<Post[]> => {
  return fetch(`${SERVER_URL}/api/posts`, {
    method: 'GET',
    mode: 'cors',
    headers: buildHeaders(user)
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.error(error);
    return [];
  });
}

export const savePost = (user: User | null, post: PostEdit): Promise<Post> => {
  return fetch(`${SERVER_URL}/api/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: buildHeaders(user),
    body: JSON.stringify(post)
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.error(error);
    return {};
  });
}

const buildHeaders = (user: User | null): HeadersInit => {
  return {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    'x-id-token': user?.token.idToken || ''
  }
}
