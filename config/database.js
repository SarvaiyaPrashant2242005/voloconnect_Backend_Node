const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.PGDATABASE || 'mydatabase',
    process.env.PGUSER || 'postgres',
    process.env.PGPASSWORD || 'yourpassword',
    {
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      dialect: 'postgres',
      pool: {
        max: parseInt(process.env.PG_POOL_MAX || '20', 10),
        min: parseInt(process.env.PG_POOL_MIN || '0', 10),
        idle: parseInt(process.env.PG_POOL_IDLE_TIMEOUT || '10000', 10),
        acquire: parseInt(process.env.PG_POOL_ACQUIRE || '30000', 10)
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the sequelize instance
module.exports = { sequelize, testConnection };