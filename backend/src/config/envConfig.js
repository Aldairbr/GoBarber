const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '.env'),
});

export const { DATABASE } = process.env;
export const { PORT } = process.env || 3000;
export const { PASSWORD } = process.env;
export const { HOST } = process.env;
export const { USER } = process.env;
export const { DIALECT } = process.env;
