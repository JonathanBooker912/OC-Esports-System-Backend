module.exports = (sequelize, Sequelize) => {
    const Alias = sequelize.define("alias", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
    },
    gamerTag: {
        type: Sequelize.STRING,
    }
    });

    return Alias;
};