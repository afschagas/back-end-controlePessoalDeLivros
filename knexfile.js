// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config();

module.exports = {
  //  development: {
  //   client: "sqlite3",
  //   connection: {
  //    filename: "./data/editora.db3",
  //  },
  //  useNullAsDefault: true,
  //  migrations: {
  //   directory: "./data/migrations",
  // },
  //  seeds: {
  //   directory: "./data/seeds",
  // },
  // },

  development: {
    client: "pg",
    connection: process.env.PGHOST,
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
};
