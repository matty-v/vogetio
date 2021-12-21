import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * /api/posts
 */
const postPublicController = Router();

// Get all published posts
postPublicController.get('/', async (req: Request, res: Response) => {

  const posts = await prisma.post.findMany({
    where: {
      published: true
    }
  });

  return res.json(posts);
});

// Get all published and pinned posts
postPublicController.get('/pinned', async (req: Request, res: Response) => {

  const posts = await prisma.post.findMany({
    where: {
      AND : {
        published: true,
        pinned: true
      }
    }
  });

  return res.json(posts);
});

// Get published post by ID
postPublicController.get('/:id', async (req: Request, res: Response) => {

  let post = {};

  try {
    post = await prisma.post.findFirst({
      where: {
        AND: {
          id: req.params.id,
          published: true
        }
      }
    })
  } catch(e) {
    console.error(e);
  }

  return res.json(post);
});

export default postPublicController;
