const { launches } = require('../../models/launches.model');

function getLaunches(req, res) {
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getLaunches,
};
