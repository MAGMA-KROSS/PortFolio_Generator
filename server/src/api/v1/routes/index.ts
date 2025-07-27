import express from 'express';
import signupRoutes from './signup.routes';
import loginRoutes from './login.routes';
import userRoutes from './user.routes';
import testRoutes from './test.routes';
import projectRoutes from './project.routes'; 
const router = express.Router();

// Mount individual route files
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/users', userRoutes);
router.use('/test', testRoutes);
router.use('/projects',projectRoutes);
export default router;

 