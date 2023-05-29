module.exports = (sequelize, Sequelize) => {
  const Title = sequelize.define("title", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  });

  return Title;
};
