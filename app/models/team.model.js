module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("team", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    isFlagship: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return Team;
};
