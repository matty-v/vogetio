import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import authFilter from './auth-filter';

const prisma = new PrismaClient();

/**
 * /api/posts
 */
const postController = Router();
postController.use(authFilter);

// Get all posts
postController.get('/', async (req: Request, res: Response) => {

  const posts = await prisma.post.findMany({
    where: {
      author: {
        email: req['email']
      }
    }
  });

  return res.json(posts);
});

// Get post by ID
postController.get('/:id', async (req: Request, res: Response) => {

  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id
    }
  });

  return res.json(post);
});

// Create new post
postController.post('/', async (req: Request, res: Response) => {

  if (!req.body.title) return res.status(400).json({ message: 'Invalid request: Post is missing a title!' });
  if (!req.body.content) return res.status(400).json({ message: 'Invalid request: Post is missing content!' });

  const newPost = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      author: {
        connect: {
          email: req['email']
        }
      }
    }
  })

  return res.json(newPost);
});

// Update a post
postController.put('/:id', async (req: Request, res: Response) => {

  const title = req.body.title || undefined;
  const content = req.body.content || undefined;

  if (!title && !content) return res.status(400).send({ message: 'Invalid request: did not provide post data to update (title/content)' });

  const postDataToUpdate = {
    ...title && ({title}),
    ...content && ({content}),
  }

  const postToUpdate = await prisma.post.findUnique({
    where: {
      id: req.params.id
    }
  });

  if (!postToUpdate) return res.status(400).send({ message: `Could not find a post with ID: ${req.params.id}` });

  const updatedPost = await prisma.post.update({
    where: {
      id: postToUpdate.id
    },
    data : postDataToUpdate
  })

  return res.json(updatedPost);
});

// Delete a post
postController.delete('/:id', async (req: Request, res: Response) => {

  const postToDelete = await prisma.post.findUnique({
    where: {
      id: req.params.id
    }
  });

  if (!postToDelete) return res.status(400).send({ message: `Could not find a post with ID: ${req.params.id}` });

  const deletedPost = await prisma.post.delete({
    where: {
      id: postToDelete.id
    }
  })

  return res.json(deletedPost);
});


export default postController;
