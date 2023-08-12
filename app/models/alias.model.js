module.exports = (sequelize, Sequelize) => {
  const Alias = sequelize.define("alias", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    aliasType: {
      type: Sequelize.ENUM("Primary", "Alternate"),
    },
    gamerTag: {
      type: Sequelize.STRING,
    },
  });

  return Alias;
};
