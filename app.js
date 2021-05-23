'use strict';

const { routeTrackCase } = require('./routers/index');
const bodyParser = require('body-parser');
const compression = require('compression')
const cors = require('cors');
const express = require('express');
const app = express();
const { NODE_ENV } = require('./configurations/env.config')
const morgan = require('morgan');
const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
};
//---
/* server settings */
app.use(cors());

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(compression({
    level: 1,
    filter: shouldCompress
}));
app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 1000,
    limit: '50MB'
}));
app.use(bodyParser.json({ limit: '50MB' }));
/* server settings */

app.use('/', routeTrackCase);

module.exports = app;
