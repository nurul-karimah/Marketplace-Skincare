// models/ShippingModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Shipping = sequelize.define(
  "Shipping",
  {
    region: {
      type: DataTypes.STRING, // contoh: "Jakarta Selatan"
      allowNull: false,
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2), // contoh: 20000.00
      allowNull: false,
    },
  },
  {
    tableName: "shippings",
    timestamps: true,
  }
);

export default Shipping;
