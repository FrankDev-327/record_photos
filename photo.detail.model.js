'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoDetailModel = Schema({
    photo: { type: String },
    detail_photo: { type: String },
    create_photo: { type: Date, default: new Date() }
});

const PhotoDetails = mongoose.model('PhotoDetails', PhotoDetailModel);
module.exports = PhotoDetails;