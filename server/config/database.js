const { Sequelize } = require("sequelize");
const config = require("./config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
// Option 2: Passing parameters separately (PostgreSQL)
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST, // or your PostgreSQL server's host
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will force SSL connections
        rejectUnauthorized: false, // For self-signed certificates, set to false. not recommended for production.
      },
    },
    port: process.env.PGPORT,
    logging: console.log,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
