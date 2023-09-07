import Sequelize from "sequelize";
import SequelizeInstance from "../sequelizeUtils/sequelizeInstance.js";

const UserRole = SequelizeInstance.define("userRole", {
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

export default UserRole;
