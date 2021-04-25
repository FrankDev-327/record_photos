'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoDetailModel = Schema({
    photo: { type: String },
    stole_item: { type: String },
    where_was_item: { type: String },
    folder_number: { type: String },
    unit_number: { type: String },
    agency_number: { type: String },
    detail_item: { type: String },
    date_create_info: { type: Date, default: new Date() }
});

const PhotoDetails = mongoose.model('PhotoDetails', PhotoDetailModel);
module.exports = PhotoDetails;