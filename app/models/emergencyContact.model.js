module.exports = (sequelize, Sequelize) => {
    const EmergencyContact = sequelize.define("emergencyContact", {
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
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        relationship: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return EmergencyContact;
}