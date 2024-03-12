import Sequelize from "sequelize";
import SequelizeInstance from "../sequelizeUtils/sequelizeInstance.js";

const FacilityReservation = SequelizeInstance.define("facilityReservation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reservationType: {
    type: Sequelize.ENUM("Practice", "Match"),
    allowNull: false
  },
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.DATE,
  },
});

export default FacilityReservation;
