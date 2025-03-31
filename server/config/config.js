require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PGUSER || 'your_dev_db_user',
    password: process.env.PGPASSWORD || 'your_dev_db_password',
    database: process.env.PGDATABASE || 'your_dev_db_name',
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DB_USER || 'your_test_db_user',
    password: process.env.TEST_DB_PASSWORD || 'your_test_db_password',
    database: process.env.TEST_DB_NAME || 'your_test_db_name',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Only set to false if you trust the certificate
      },
    },
  },
};