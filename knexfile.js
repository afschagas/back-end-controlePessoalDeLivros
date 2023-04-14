// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// Arquivo .env
require("dotenv").config();

module.exports = {
  development: {
    client: process.env.PGCLIENT,
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
