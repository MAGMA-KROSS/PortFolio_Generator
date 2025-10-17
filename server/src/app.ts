import express from 'express';
import cookieParser from 'cookie-parser';

import router from './api/v1/routes/index';  
import userRoutes from './api/v1/routes/user.routes';
import testRoutes from './api/v1/routes/test.routes'; // just for testing purposes
import authRoutes from './api/v1/routes/auth.route';
import projectRoutes from './api/v1/routes/project.routes';
import cartRoutes from './api/v1/routes/cart.routes'; // 🛒 new import
import adminRoutes from './api/v1/routes/admin.routes';
import cors from "cors";
const app = express();


// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend port (Vite default)
    credentials: true, // allow cookies + auth headers
  })
);

// Routes
app.use("/images", express.static("public/images"));
app.use('/api/v1', router);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes); // 🛒 new route for testing cart APIs
app.use("/admin", adminRoutes);


export default app;
