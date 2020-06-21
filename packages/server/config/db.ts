import { Sequelize } from "sequelize";

const secrets = require("./config.json");
const config = secrets[process.env.NODE_ENV];

export default new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);
