const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.POSTGRESQL_CONNECTION,{

    dialect: 'postgres'
});










// import { Sequelize } from "sequelize";

// const connectionString = process.env.POSTGRESQL_CONNECTION;

// if (!connectionString) {
//   throw new Error("POSTGRESQL_CONNECTION environment variable is not set.");
// }

// const sequelize = new Sequelize(connectionString, {
//   dialect: "postgres", 
// });

// export default sequelize;