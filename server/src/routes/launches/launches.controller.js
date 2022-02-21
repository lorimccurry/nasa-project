const { getLaunches, addLaunch } = require('../../models/launches.model');

function httpGetLaunches(req, res) {
  return res.status(200).json(getLaunches());
}

function httpAddLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    console.log(launch);
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date.',
    });
  }

  addLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpGetLaunches,
  httpAddLaunch,
};
