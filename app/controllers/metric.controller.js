import db from "../models/index.js";

const Metric = db.metric;

const exports = {};

// Create a new Metric
// Create a new Metric
exports.create = (req, res) => {
  const { metricType, dataType, name, titleId } = req.body;

  // Check if any of the required parameters are missing or empty
  if (!metricType || !dataType || !name || !titleId) {
    return res.status(400).json({
      message: "All parameters (metricType, dataType, name, titleId) are required and cannot be empty!",
    });
  }

  Metric.create({ metricType, dataType, name, titleId })
    .then((metric) => {
      res.status(201).json(metric);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: 'Unable to create Metric' });
    });
};


// Get all Metrics
exports.getAll = (req, res) => {
  Metric.findAll()
    .then((metrics) => {
      res.status(200).json(metrics);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to fetch Metrics' });
    });
};

// Get a single Metric by ID
exports.getById = (req, res) => {
  const { id } = req.params;

  Metric.findByPk(id)
    .then((metric) => {
      if (!metric) {
        return res.status(404).json({ error: 'Metric not found' });
      }
      res.status(200).json(metric);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to fetch Metric' });
    });
};

// Update a Metric by ID
exports.update = (req, res) => {
  const { id } = req.params;

  Metric.findByPk(id)
    .then((metric) => {
      if (!metric) {
        return res.status(404).json({ error: 'Metric not found' });
      }

      const { metricType, dataType, name, titleId } = req.body;

      metric.update({ metricType, dataType, name, titleId })
        .then((updatedMetric) => {
          res.status(200).json(updatedMetric);
        })
        .catch((error) => {
          res.status(500).json({ error: 'Unable to update Metric' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to update Metric' });
    });
};

// Delete a Metric by ID
exports.delete = (req, res) => {
  const { id } = req.params;

  Metric.findByPk(id)
    .then((metric) => {
      if (!metric) {
        return res.status(404).json({ error: 'Metric not found' });
      }

      metric.destroy()
        .then(() => {
          res.status(200).send({msg: 'Metric Deleted Successfully'});
        })
        .catch((error) => {
          res.status(500).json({ error: 'Unable to delete Metric' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to delete Metric' });
    });
};

exports.getAllForTitle = (req, res) => {
  const { titleId } = req.params;

  Metric.findAll({
    where: { titleId }, // Replace 'teamId' with your actual foreign key field name
  })
    .then((metrics) => {
      res.status(200).json(metrics);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to fetch Metrics for the team' });
    });
};

exports.getDataTypes = (req, res) => {
  res.send(Metric.getAttributes().dataType.values);
};

exports.getMetricTypes = (req, res) => {
  console.log(Metric.getAttributes().metricType.values)
  res.send(Metric.getAttributes().metricType.values);
};

export default exports;
