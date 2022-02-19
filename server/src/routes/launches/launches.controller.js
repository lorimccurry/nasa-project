const { getLaunches, addLaunch } = require('../../models/launches.model');

function httpGetLaunches(req, res) {
  return res.status(200).json(getLaunches());
}

function httpAddLaunch(req, res) {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);
  addLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetLaunches,
  httpAddLaunch,
};
