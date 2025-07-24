import express from 'express';
import signupRoutes from './signup.routes';
import loginRoutes from './login.routes';

const router = express.Router();

// Mount individual route files
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);

export default router;

 