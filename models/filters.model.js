const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connect");

class Filter extends Model {}

Filter.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    column: {
      type: DataTypes.TEXT,
    },
    criterion: {
      type: DataTypes.JSON,
    },
    deleted: {
      type: DataTypes.TINYINT,
    },
  },
  {
    tableName: "db_filters",
    sequelize,
  }
);

module.exports = Filter;
