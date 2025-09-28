import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./KategoriModels.js";

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.STRING, // simpan path atau nama file
    },
    review: {
      type: DataTypes.TEXT,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

// Relasi: 1 Category bisa punya banyak Product
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" }); // ✅ pastikan sama


export default Product;
