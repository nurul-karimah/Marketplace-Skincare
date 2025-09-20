import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("pending", "in-progress", "done"),
    defaultValue: "pending"
  },
  due_date: {
    type: DataTypes.DATE,
  },
},{
  tableName : "tasks",
  timestamp: true,
});

export default Task;