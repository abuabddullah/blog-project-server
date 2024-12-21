"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config/config");
const database_1 = require("./config/database");
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const globalErrorhandler_1 = __importDefault(require("./middleware/globalErrorhandler"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
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
app.get("/", (req, res) => {
    res.send("Hello World!");
});
/* create a unmatch route and return html type response which gives a vive of frontend*/
app.get("*", (req, res) => {
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
app.use(globalErrorhandler_1.default);
// Start server
const PORT = config_1.config.port;
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
