const { Sequelize } = require("sequelize");
const config = require("./config");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
// Option 2: Passing parameters separately (PostgreSQL)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost", // or your PostgreSQL server's host
    dialect: "postgres",
    port: 5432,
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
