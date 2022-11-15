import { Router } from 'express';

import { login, register, protect } from '../controller/authenticationController';
import { getAllUsers, getUser } from '../controller/userController';

const staffRouter = Router();

// AUTHENTICATION ROUTES (tbp)
staffRouter.route('/login').post(login);
staffRouter.route('/register').post(register);

// USER ROUTES
staffRouter.route('/').get(getAllUsers);
staffRouter.route('/:id').get(getUser);

export default staffRouter;
