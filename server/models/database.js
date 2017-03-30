const schemas = require('./schemas');

const database = schemas.sequelize;

module.exports = {
  initialize: () => {
    // 警告: true にするとデータベースが吹き飛びます
    return database.sync({ force: false });
  },
  Account: schemas.account
};
