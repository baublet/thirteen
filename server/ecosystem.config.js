module.exports = {
  apps: [
    {
      name: "thirteen-server",
      script: "npm",
      args: "start",
      watch: ".",
      watch_delay: 500,
      ignore_watch: ["development.db", "development.db-journal", "node_modules"],
    },
  ],
};
