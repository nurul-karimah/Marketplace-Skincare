// models/OrderModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./UserModel.js";
import Product from "./ProdukModels.js";
import Shipping from "./ShippingModels.js";
import Courier from "./CouriesModels.js";

const Order = sequelize.define(
  "Order",
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("COD", "TRANSFER"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("MENUNGGU", "DIBAYAR", "DIKIRIM", "SELESAI"),
      defaultValue: "MENUNGGU",
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    // 🧾 Bukti pembayaran (opsional, hanya untuk metode transfer)
    buktiPembayaran: {
      type: DataTypes.STRING, // bisa simpan URL / path file
      allowNull: true,
    },

    // 🏦 Informasi Bank Tujuan
    namaBank: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noRekening: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

// 🔗 Relasi
Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Product, { foreignKey: "productId" });
Order.belongsTo(Shipping, { foreignKey: "shippingId" });
Order.belongsTo(Courier, { foreignKey: "courierId" });

export default Order;
