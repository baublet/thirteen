require("ts-node/register/transpile-only");

const { test } = require("./knexfile");

module.exports = async () => {
  await test.closeConnection();
};
