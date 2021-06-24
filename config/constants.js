const path = require("path");

// import .env variables
require("dotenv-safe").config({
  allowEmptyValues: true,
  path: path.join(__dirname, "../", ".env"),
  example: path.join(__dirname, "../", ".env.example"),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiUsersUrl: `${process.env.API_ENDPOINT}/stake/users/transactions`,
  logs: process.env.NODE_ENV === "prod" ? "combined" : "dev",
};
