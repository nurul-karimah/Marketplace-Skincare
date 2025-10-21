import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import AdminRoutes from "./routes/AdminRoute.js"; // tambahin route admin
import UserRoute from "./routes/UserRoute.js";
import OrderRoute from "./routes/OrderRoute.js"
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import session from "express-session";

const app = express();

// Middleware dasar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173", // frontend React
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// ✅ Tambahkan middleware session
app.use(
  session({
    secret: "682250166746784de5677826d3c06266eea41d267641ff3dbf6719b84f6841530421238fa8f794d4be1f8bfd9cf15d8784c6abad6ffa19199fbed93130cb4714", // ganti dengan string random/unik
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // kalau pakai HTTPS set ke true
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2, // 2 jam
    },
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
app.use(AdminRoutes); // <-- tambahin route admin
app.use(UserRoute);
app.use(OrderRoute);

// Handler 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
