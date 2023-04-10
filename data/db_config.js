const knex = require("knex");
const config = require("../knexfile");
const dbknex = knex(config.development);

const env = process.env.NODE_ENV || "development";

module.exports = dbknex;
