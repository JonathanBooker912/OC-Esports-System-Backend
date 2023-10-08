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

export default exports;
