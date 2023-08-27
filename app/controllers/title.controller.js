import db from "../models/index.js"

const Title = db.title;

const exports = {}

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

export default exports;