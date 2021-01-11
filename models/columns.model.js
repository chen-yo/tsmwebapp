const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connect");

class Columns extends Model {}

Columns.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sourceName: {
      field: "source_name",
      type: DataTypes.TEXT,
    },
    displayName: {
      field: "display_name",
      type: DataTypes.TEXT,
    },
    distinctValue: {
      field: "distinct_values",
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "db_columns",
    sequelize: sequelize,
  }
);

module.exports = Columns;
