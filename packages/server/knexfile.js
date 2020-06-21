const knex = require("knex");
const fs = require("fs");
const path = require("path");

const test = {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "test.db"),
  },
  getConnection: async () => {
    return knex({
      client: test.client,
      connection: test.connection,
    });
  },
  create: async () => {
    return await test.getConnection();
  },
  drop: async () => {
    return new Promise((resolve) => {
      const file = path.resolve(test.connection);
      fs.unlink(file, () => {
        resolve();
      });
    });
  },
};

const development = {
  client: "pg",
  connection: { user: "thirteen", database: "thirteen" },
  getConnection: async () => {
    return knex({
      client: test.client,
      connection: test.connection,
    });
  },
  create: async () => {},
  drop: async () => {
    return await test.getConnection().schema.dropSchemaIfExists();
  },
};

module.exports = {
  test,
  development,
};
