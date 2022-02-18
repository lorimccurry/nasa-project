const { planets } = require('../../models/planets.model');

function httpGetPlanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = {
  httpGetPlanets,
};
