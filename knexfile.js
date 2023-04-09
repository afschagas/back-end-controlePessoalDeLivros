// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

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
    connection: {
      host: "postgres-ag-br1-4.hospedagemelastica.com.br",
      port: 54114,
      database: "mqmswm_livros",
      user: "mqmswm_alexandre",
      password: "Linuxmall200483",
    },
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
