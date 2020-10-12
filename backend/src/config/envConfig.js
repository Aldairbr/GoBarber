const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});

const { DIALECT } = process.env;
const { DATABASE } = process.env;
const { PORT } = process.env || 3000;
const { PASSWORD } = process.env;
const { HOST } = process.env;
const { USER } = process.env;
const { URL_MONGO_DB } = process.env;

module.exports = {
  HOST,
  USER,
  DATABASE,
  PORT,
  PASSWORD,
  DIALECT,
  URL_MONGO_DB,
};
