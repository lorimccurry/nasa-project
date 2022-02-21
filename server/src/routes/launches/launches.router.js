const express = require('express');
const {
  httpGetLaunches,
  httpAddLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetLaunches);
launchesRouter.post('/', httpAddLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;
