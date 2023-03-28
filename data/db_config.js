const knex = require('knex');
const config = require("../knexfile");
const dbknex = knex(config.development);
module.exports = dbknex;


