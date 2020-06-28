const knex = require("knex");
const fs = require("fs");
const path = require("path");

const test = {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "test.db"),
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "seeds", "test"),
  },
  getConnection: async () => {
    return knex({
      client: test.client,
      connection: test.connection,
      useNullAsDefault: true,
      migrations: test.migrations,
    });
  },
  create: async () => {
    return await test.getConnection();
  },
  drop: async () => {
    return new Promise((resolve) => {
      const file = test.connection.filename;
      fs.unlink(file, () => {
        resolve();
      });
    });
  },
};

const development = {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "development.db"),
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  getConnection: async () => {
    return knex({
      client: development.client,
      connection: development.connection,
      useNullAsDefault: true,
      migrations: development.migrations,
    });
  },
  create: async () => {
    return await development.getConnection();
  },
  drop: async () => {
    return new Promise((resolve) => {
      const file = development.connection.filename;
      fs.unlink(file, () => {
        resolve();
      });
    });
  },
};

const production = {
  client: "pg",
  connection: { user: "thirteen", database: "thirteen" },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  getConnection: async () => {
    return knex({
      client: test.client,
      connection: test.connection,
      migrations: test.migrations,
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
  production,
};
