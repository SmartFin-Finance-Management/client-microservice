

import express from 'express';
import clientRoutes from './routes/clientRoutes';
import cors from 'cors';
import './config/database';
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/clients', clientRoutes);

// Optionally, add a default route for health checks
app.get('/', (req, res) => {
    res.send('API is running');
});

export default app;