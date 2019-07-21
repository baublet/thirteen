import { Sequelize } from "sequelize";
import dbConfig from "./config.json";

const config = dbConfig[process.env];

export default new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});
