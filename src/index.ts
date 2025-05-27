import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {PORT} from "../src/config";
import {connectToDatabase} from "./database/connection";
import blogRoutes from './routes/blog.routes';
import dotenv from 'dotenv';
dotenv.config();

// Connect to the database
connectToDatabase();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      auth: req.headers.authorization
    });
    next();
  });

// Define routes
app.use(blogRoutes);

// Define a initialization route
app.get('/start', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});