import { Router } from 'express';
import postController from './posts-controller';

const routes = Router();

routes.use('/api/posts', postController);

export default routes;
