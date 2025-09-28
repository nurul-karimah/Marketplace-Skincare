import { Sequelize } from "sequelize";

const sequelize = new Sequelize("marketplace_skincare", "root", "root", {
  host: "localhost",
  dialect: "mysql" // ✅ BUKAN root
});

export default sequelize;
