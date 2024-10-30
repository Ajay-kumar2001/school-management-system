import express, {  Response } from 'express';
import userRoutes from './services/userservice/routes/userRoutes';
import { errorHandler } from './middlewares/errorhandler';
import "dotenv/config"
import "./dataBase/connection"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./swagger-output.json";

const app = express();

// Middleware to parse JSON bodies

app.use(express.json());
const port = process.env.PORT || 4000;
// Define a simple route
app.get('/', ( res: Response) => {
  res.send('Hello, TypeScript Server!');
});
app.use("/api/v1/users", userRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});