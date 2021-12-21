import { Router } from 'express';
import postAdminController from './posts-admin-controller';
import postPublicController from './posts-public-controller';

const routes = Router();

routes.use('/api/admin/posts', postAdminController);
routes.use('/api/posts', postPublicController);

export default routes;
