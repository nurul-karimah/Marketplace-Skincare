import app from "./app.js";
import sequelize from "./config/db.js";
import Task from "./models/taskModels.js";

const PORT =5000;

const startServer = async ()=>{
  try {
    await sequelize.authenticate();
    console.log("Database connected...");

    // model to DB (AUTO create table if does not exist)
    await Task.sync();
    console.log("Table created...")

    app.listen(PORT, ()=> {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

startServer();