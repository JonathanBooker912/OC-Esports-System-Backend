import db from "../models/index.js";
import matchDataUtils from "../sequelizeUtils/matchData.js";

const Op = db.Sequelize.Op;
const FacilityReservation = db.facilityReservation;
const Team = db.team

const facilityReservationController = {};

// Create a new FacilityReservation
facilityReservationController.create = (req, res) => {
  const { startTime, endTime, teamId, facilityStationId } = req.body;

  // Check if any of the required parameters are missing or empty
  if (!startTime || !facilityStationId) {
    return res.status(400).json({
      message: "All parameters (startTime, facilityStationId) are required and cannot be empty!",
    });
  }

  FacilityReservation.create({ startTime, endTime, teamId, facilityStationId })
    .then((facilityReservation) => {
      res.status(201).json(facilityReservation);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Unable to create FacilityReservation" });
    });
};

// Get all FacilityReservations for a specific facility station
facilityReservationController.getAllForFacilityStation = (req, res) => {
  const facilityStationId = req.params.facilityStationId;

  FacilityReservation.findAll({ where: { facilityStationId } })
    .then((facilityReservations) => {
      res.send(facilityReservations);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message || "Unable to fetch FacilityReservations" });
    });
};

// Get FacilityReservation by ID
facilityReservationController.getById = (req, res) => {
  const { id } = req.params;

  FacilityReservation.findByPk(id, {
    include:[
      {
        model: Team,
        attributes: ['id','name', 'teamColor']
      }
    ]
  })
    .then((facilityReservation) => {
      if (!facilityReservation) {
        return res.status(404).json({ error: "FacilityReservation not found" });
      }
      res.status(200).json(facilityReservation);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message || "Unable to fetch FacilityReservation" });
    });
};

// Update FacilityReservation by ID
facilityReservationController.update = (req, res) => {
  const { id } = req.params;

  FacilityReservation.findByPk(id).then((facilityReservation) => {
    if (!facilityReservation) {
      return res.status(404).json({ error: "FacilityReservation not found" });
    }

    const { startTime, endTime, teamId, facilityStationId } = req.body;

    facilityReservation.startTime = startTime;
    facilityReservation.endTime = endTime;
    facilityReservation.teamId = teamId;
    facilityReservation.facilityStationId = facilityStationId;

    facilityReservation
      .save()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Unable to update FacilityReservation",
        });
      });
  });
};

// Delete FacilityReservation by ID
facilityReservationController.delete = (req, res) => {
  const { id } = req.params;

  FacilityReservation.findByPk(id)
    .then((facilityReservation) => {
      if (!facilityReservation) {
        return res.status(404).json({ error: "FacilityReservation not found" });
      } else {
        facilityReservation.destroy();
        return res.status(200).json({ message: "FacilityReservation deleted successfully" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message || "Unable to delete FacilityReservation" });
    });
};

// Get all FacilityReservations by facilityStationId
facilityReservationController.getAllByFacilityStationId = (req, res) => {
    const { facilityStationId } = req.params;
  
    FacilityReservation.findAll({ 
      where: { facilityStationId },
      include: [
        {
          model: Team,
          attributes: ['id','name', 'teamColor']
    
        }
      ],
    })
      .then((facilityReservations) => {
        res.send(facilityReservations);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message || "Unable to fetch FacilityReservations" });
      });
  };

export default facilityReservationController;
