// models/CourierModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Courier = sequelize.define(
  "Courier",
  {
    name: {
      type: DataTypes.STRING, // contoh: "JNE", "JNT", "SiCepat"
      allowNull: false,
    },
  },
  {
    tableName: "couriers",
    timestamps: true,
  }
);

export default Courier;
