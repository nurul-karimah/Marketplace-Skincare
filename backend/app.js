import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

// Middleware dasar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend React
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware upload pakai express-fileupload saja
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Public folder untuk akses gambar/file statis
app.use(express.static("public"));

// Routes
app.use(taskRoutes);
app.use(ProductRoutes);

// Handler 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
