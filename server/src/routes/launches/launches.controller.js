const { getLaunches } = require('../../models/launches.model');

function httpGetLaunches(req, res) {
  return res.status(200).json(getLaunches);
}

module.exports = {
  httpGetLaunches,
};
