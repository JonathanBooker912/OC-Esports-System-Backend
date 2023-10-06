import db from "../models/index.js";

const Title = db.title;

const exports = {};

// Create and Save a new Title
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Title
  const title = {
    name: req.body.name,
  };
  // Save Title in the database
  Title.create(title)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const updatedTitle = {
    name: req.body.name,
  };

  Title.update(updatedTitle, {
    where: { id: id },
  })
    .then((result) => {
      if (result[0] === 1) {
        res.status(200).send({ message: "Title was updated successfully." });
      } else {
        res.status(404).send({
          message: `Cannot update Title with id=${id}. Title not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Title with id=" + id,
      });
    });
};


exports.find = (req, res) => {
  const { id } = req.params;

  Title.findByPk(id, { attributes: ["id", "name"] })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Title with id ${id} not found.`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the title.",
      });
    });
};

// Retrieve all Titles from the database.
exports.findAll = (req, res) => {
  Title.findAll({ attributes: ["id", "name"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Title.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({ message: "Title was deleted successfully." });
      } else {
        res.status(404).send({
          message: `Cannot delete Title with id=${id}. Title not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Title with id=" + id,
      });
    });
};

export default exports;
