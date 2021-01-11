const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connect');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      field: 'email_address',
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'db_users',
    sequelize: sequelize
  }
);

module.exports = User;
