import { Router, Request, Response } from 'express';
import authFilter from './auth-filter';

const postController = Router();

postController.use(authFilter);

// Route: /api/posts
postController.get('/', (req: Request, res: Response) => {

  const testResponse = [{
    name:'post 1',
    content: 'post 1 content'
  }];

  return res.json(testResponse);
});

export default postController;
