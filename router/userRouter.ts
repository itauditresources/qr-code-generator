import { Router } from 'express';

import { getAllUsers, getUser } from '../controller/userController';

const staffRouter = Router();

// AUTHENTICATION ROUTES (might be added)

// USER ROUTES
staffRouter.route('/').get(getAllUsers);

staffRouter.route('/:id').get(getUser);

export default staffRouter;
