import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import multer from "multer";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(upload.none());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(taskRoutes);
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});
app.use(notFoundHandler);
app.use(errorHandler);

export default app;