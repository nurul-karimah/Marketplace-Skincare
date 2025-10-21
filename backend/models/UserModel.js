// models/UserModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING, // simpan nama file foto
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // disimpan dalam bentuk hash
      allowNull: false,
    },
    kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rt_rw: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamatLengkap: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     nohandphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
