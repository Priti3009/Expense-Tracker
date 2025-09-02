import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors()); // Enable CORS (frontend-backend connection)
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Temporary route (to test if server works)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export { app };
