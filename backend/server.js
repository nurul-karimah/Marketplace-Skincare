import app from "./app.js";
import sequelize from "./config/db.js";
import Category from "./models/KategoriModels.js";
import Product from "./models/ProdukModels.js";

const PORT = 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    // Sync semua model ke database
    await sequelize.sync({ alter: true }); 
    // ⚠️ alter:true => update table kalau ada perubahan model
    // ⚠️ force:true => drop table lama lalu buat ulang (hati-hati data hilang)

    console.log("All tables synced...");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

startServer();
