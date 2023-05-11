module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shirtSize: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pantSize: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    outsidePC: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    fullVacc: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    classification: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expectedGradDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    activePlayer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "User",
    },
    // refresh_token: {
    //   type: Sequelize.STRING(512),
    //   allowNull: true
    // },
    // expiration_date: {
    //   type: Sequelize.DATE,
    //   allowNull: true
    // },
  });

  return User;
};
