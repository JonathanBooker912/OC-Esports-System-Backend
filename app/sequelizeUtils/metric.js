import db from "../models/index.js";
const Metric = db.metric;

const exports = {};

exports.findAllMatchesWhere = async (condition, offset, limit) => {
  return await Metric.findAndCountAll({
    where: condition,
    offset: offset,
    limit: limit,
  });
};

exports.getAllMetrics = async (titleId) => {
  return await Metric.findAll({
    where: { titleId: titleId },
  });
};
export default exports;
