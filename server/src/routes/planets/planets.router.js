const express = require('express');
const { httpGetPlanets } = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', httpGetPlanets);

module.exports = planetsRouter;
