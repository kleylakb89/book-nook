// requiring sequelize and dotenv for environment variables
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// on Heroku, will use the JAWSDB_URL, otherwise runs locally
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    '',
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
  );
}
module.exports = sequelize;