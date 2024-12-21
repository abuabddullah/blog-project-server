import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { config } from "./config/config";
import { connectDB } from "./config/database";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import globalErrorHandler from "./middleware/globalErrorhandler";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
/* app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      statusCode,
      error: err.error,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
); */

/* create a default api for http://localhost:5000/ or base route */
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

/* create a unmatch route and return html type response which gives a vive of frontend*/
app.get("*", (req: express.Request, res: express.Response) => {
  res.send(`
  <html>
    <head>
      <title>404 Not Found</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f8f9fa;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        h1 {
          font-size: 3em;
          margin-bottom: 0.5em;
        }
        p {
          font-size: 1.2em;
          margin-bottom: 1em;
        }
        a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404 Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p><a href="/">Go back to Home</a></p>
      </div>
    </body>
  </html>
`);
});

app.use(globalErrorHandler);

// Start server
const PORT = config.port;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
