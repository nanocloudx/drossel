module.exports = (sequelize, DataTypes) => {
  return sequelize.define('account', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    twitterName: DataTypes.STRING,
    twitterImage: DataTypes.STRING,
    twitterId: DataTypes.STRING
  }, {
    indexes: [{ fields: ['twitterId'] }]
  });
};
