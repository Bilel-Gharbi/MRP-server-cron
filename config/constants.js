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
  apiUserUpdateUrl: `${process.env.API_ENDPOINT}/stake/user`,
  apiUserBalance: `${process.env.API_ENDPOINT}/stake/account`,
  apiUpdateConstants: `${process.env.API_ENDPOINT}/stake/constants`,
  logs: process.env.NODE_ENV === "prod" ? "combined" : "dev",
};
