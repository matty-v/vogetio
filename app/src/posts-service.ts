import { User } from "./auth-service";

const SERVER_URL = process.env.SERVER_URL;

export type PostEdit = {
  title?: string;
  content?: string;
  pinned?: string;
  published?: string;
}

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  pinned: string;
  published: string;
}

export const fetchPublishedPosts = (): Promise<Post[]> => {
  return fetch(`${SERVER_URL}/api/posts`, {
    method: 'GET',
    mode: 'cors'
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return [];
  });
}

export const fetchPublishedAndPinnedPosts = (): Promise<Post[]> => {
  return fetch(`${SERVER_URL}/api/posts/pinned`, {
    method: 'GET',
    mode: 'cors'
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return [];
  });
}

export const fetchPublishedPostById = (postId: string): Promise<Post> => {
  return fetch(`${SERVER_URL}/api/posts/${postId}`, {
    method: 'GET',
    mode: 'cors'
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return null;
  });
}

export const fetchPosts = (user: User | null): Promise<Post[]> => {
  return fetch(`${SERVER_URL}/api/admin/posts`, {
    method: 'GET',
    mode: 'cors',
    headers: buildHeaders(user)
  })
  .then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return [];
    }
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return [];
  });
}

export const fetchPostById = (user: User | null, postId: string): Promise<Post> => {
  return fetch(`${SERVER_URL}/api/admin/posts/${postId}`, {
    method: 'GET',
    mode: 'cors',
    headers: buildHeaders(user)
  })
  .then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return {} as any;
    }
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return {} as any;
  });
}

export const createPost = (user: User | null, post: PostEdit): Promise<Post> => {
  return fetch(`${SERVER_URL}/api/admin/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: buildHeaders(user),
    body: JSON.stringify(post)
  })
  .then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return {} as any;
    }
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error(error);
    return {} as any;
  });
}

export const updatePost = (user: User | null, postId: string, post: PostEdit): Promise<Post> => {
  return fetch(`${SERVER_URL}/api/admin/posts/${postId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: buildHeaders(user),
    body: JSON.stringify(post)
  })
  .then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return {} as any;
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.error(error);
    return {} as any;
  });
}

export const deletePost = (user: User | null, postId: string): Promise<Post> => {
  return fetch(`${SERVER_URL}/api/admin/posts/${postId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: buildHeaders(user)
  })
  .then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return {} as any;
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    return data;
  })
  .catch((error) => {
    console.error(error);
    return {} as any;
  });
}

const buildHeaders = (user: User | null): HeadersInit => {
  return {
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    'x-id-token': user?.token.idToken || ''
  }
}
