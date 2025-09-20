import { Sequelize } from "sequelize";

const sequelize = new Sequelize("taskdb", "postgres", "Rakkha-17", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default sequelize;