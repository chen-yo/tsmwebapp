const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'tsm',
  process.env.TSM_USER,
  process.env.TSM_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  }
);

const tryConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

tryConnect();

module.exports = sequelize;
