const knex = require("knex");
const fs = require("fs");
const path = require("path");

const test = {
  db: undefined,
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
  /**
   * @returns Promise<DatabaseInterface>
   */
  getConnection: async () => {
    if (test.db) return test.db;
    test.db = knex({
      client: test.client,
      connection: test.connection,
      useNullAsDefault: true,
      migrations: test.migrations,
    });
    return test.db;
  },
  closeConnection: async () => {
    if (!test.db) return;
    const close = test.db.destroy();
    test.db = undefined;
    return close;
  },
  migrate: async () => {
    const connection = await test.getConnection();
    return connection.migrate.latest();
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
  db: undefined,
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "development.db"),
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  /**
   * @returns Promise<DatabaseInterface>
   */
  getConnection: async () => {
    if (development.db) return development.db;
    development.db = knex({
      client: development.client,
      connection: development.connection,
      useNullAsDefault: true,
      migrations: development.migrations,
    });
    return development.db;
  },
  closeConnection: async () => {
    if (!development.db) return;
    const close = development.db.destroy();
    development.db = undefined;
    return close;
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
  db: undefined,
  client: "pg",
  connection: { user: "thirteen", database: "thirteen" },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  /**
   * @returns Promise<DatabaseInterface>
   */
  getConnection: async () => {
    if (production.db) return production.db;
    production.db = knex({
      client: production.client,
      connection: production.connection,
      useNullAsDefault: true,
      migrations: production.migrations,
    });
    return production.db;
  },
  closeConnection: async () => {
    if (!production.db) return;
    const close = production.db.destroy();
    production.db = undefined;
    return close;
  },
  create: async () => {},
  drop: async () => {
    return await production.getConnection().schema.dropSchemaIfExists();
  },
};

module.exports = {
  test,
  development,
  production,
};
