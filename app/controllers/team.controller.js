import db from "../models/index.js";

const Team = db.team;
const Op = db.Sequelize.Op;

const exports = {};

// Create a new team
exports.create = (req, res) => {
  // Validate request
  const { name, titleId } = req.body;

  // Validate name
  if (!name) {
    return res.status(400).send({
      message: "Name cannot be empty!",
    });
  }

  // Validate titleId
  if (!titleId) {
    return res.status(400).send({
      message: "Title ID cannot be empty!",
    });
  }

  // Create a Team
  const team = {
    name: name,
    titleId: titleId,
    isFlagship: req.body.isFlagship || false,
  };

  // Save Team in the database
  Team.create(team)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Team.",
      });
    });
};

// Update an existing team
exports.update = (req, res) => {
  const teamId = req.params.id;

  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { name, isFlagship } = req.body;

  Team.update({ name, isFlagship }, { where: { id: teamId } })
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Team was updated successfully." });
      } else {
        res.send({ message: "Team not found or unable to update." });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Team with id=" + teamId,
      });
    });
};

// Delete a team
exports.delete = (req, res) => {
  const teamId = req.params.id;

  Team.destroy({ where: { id: teamId } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Team was deleted successfully." });
      } else {
        res
          .status(404)
          .send({ message: "Team not found or unable to delete." });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Team with id=" + teamId,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Team.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Team with id=${id}.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Team with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const filter = req.query.filter;
  const offset = req.query.pageSize * (req.query.page - 1) || 0;
  const limit = Number(req.query.pageSize) || 10; // Adjust the default limit as needed

  if (filter == undefined || filter == "" || filter == null) {
    var condition = id
      ? { id: { [Op.like]: `%${id}%` } }
      : name
      ? { name: { [Op.like]: `%${name}%` } }
      : null;
    Team.findAndCountAll({
      where: condition,
      offset: offset,
      limit: limit,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving teams.",
        });
      });
  } else {
    var filterCondition = {
      [Op.or]: [
        { id: { [Op.like]: "%" + filter + "%" } },
        { name: { [Op.like]: "%" + filter + "%" } },
      ],
    };
    Team.findAndCountAll({
      where: {
        [Op.or]: filterCondition,
      },
      offset: offset,
      limit: limit,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving teams.",
        });
      });
  }
};

export default exports;
