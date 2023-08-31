module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("userRole", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agree: {
        type: Sequelize.BOOLEAN,
      },
      dateSigned: {
        type: Sequelize.DATE,
      },
    });
  
    return UserRole;
  };
  