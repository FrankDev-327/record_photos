'use strict';

const {
    CLOUNDRY_API_KEY,
    CLOUNDRY_NAME,
    CLOUNDRY_API_SECRET_KEY
} = require('../configurations/env.config');
const Cloudinary = require('cloudinary').v2;
Cloudinary.config({
    cloud_name: CLOUNDRY_NAME,
    api_key: CLOUNDRY_API_KEY,
    api_secret: CLOUNDRY_API_SECRET_KEY
});

module.exports = { Cloudinary };