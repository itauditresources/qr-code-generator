import { Router } from 'express';

import staff from '../controller/staffController';

const staffRouter = Router();

// AUTHENTICATION ROUTES (might be added)

// PRODUCTION ROUTES
staffRouter.get('/vcards');

export default staffRouter;
