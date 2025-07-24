import express from 'express';
import router from './api/v1/routes/index'; // 👈 this is your main router

const app = express();
app.use(express.json());

// Use the routes you've defined in index.ts
app.use('/api/v1', router);

export default app;
