import express, {  Response } from 'express';
import userRoutes from './services/userservice/routes/userRoutes';
import { errorHandler } from './middlewares/errorhandler';
const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', ( res: Response) => {
  res.send('Hello, TypeScript Server!');
});
app.use("/api/v1/users", userRoutes);
app.use(errorHandler)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});