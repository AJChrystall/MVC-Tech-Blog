const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.JAWSDB_URL || 'your_database_url',
  {
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

module.exports = sequelize;
