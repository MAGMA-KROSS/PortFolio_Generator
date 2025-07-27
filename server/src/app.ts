import express from 'express';
import router from './api/v1/routes/index';  
import userRoutes from './api/v1/routes/user.routes';
 
import testRoutes from './api/v1/routes/test.routes';//just for testing purposes
const app = express();
app.use(express.json());

 
app.use('/api/v1', router);
 
app.use('/api/v1/users', userRoutes);
import ProjectRoutes from './api/v1/routes/project.routes'; // Importing
app.use("/api/v1/test", testRoutes);
app.use("/api/v1", ProjectRoutes);
 


export default app;


 