module.exports = (sequelize, Sequelize) => {
    const Match = sequelize.define("match", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Match;
  };
  