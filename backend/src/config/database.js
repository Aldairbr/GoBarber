const { HOST, USER, DATABASE, PASSWORD, DIALECT } = require('./envConfig')

module.exports = {
  dialect: DIALECT,
  host: HOST,
  username: USER,
  password: PASSWORD,
  database: DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
