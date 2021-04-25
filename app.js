'use strict';

require('dotenv').config();

const moment = require('moment-timezone');
const Cloudinary = require('cloudinary').v2;
Cloudinary.config({
    cloud_name: process.env.CLOUNDRY_NAME,
    api_key: process.env.CLOUNDRY_API_KEY,
    api_secret: process.env.CLOUNDRY_API_SECRET_KEY
});

var bodyParser = require('body-parser');
const PhotoModel = require('./photo.detail.model');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: '50MB'
}));
app.use(bodyParser.json({
    limit: '50MB'
}));
app.use(morgan('dev'));

app.post('/storing_photo', async (req, res) => {
    try {
        var params = req.body;
        Cloudinary.uploader.upload(params.img,
            async function (err, result) {
                if (err) {
                    return res.status(200).json({
                        code: 'API_Ph_403',
                        message: 'It was not possible to store the image. Try again.'
                    });
                }

                var img = result.secure_url;
                var photo_model = new PhotoModel({
                    photo: img,
                    detail_item: params.detail_item,
                    stole_item: params.stole_item,
                    where_was_item: params.where_was_item,
                    folder_number: params.folder_number,
                    unit_number: params.unit_number,
                    agency_number: params.agency_number,
                });
                var data = await photo_model.save();
                if (data == null) {
                    return res.status(200).json({
                        cd: 'Fail',
                        msg: 'No se pudo almacenar la información. Pruebe de nuevo.'
                    });
                }
                return res.status(200).json({
                    data,
                    cd: 'Success!',
                    msg: 'No se pudo almacenar la información. Pruebe de nuevo.'
                });

            });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            msg: 'It happened a error.'
        });
    }
});

app.get('/list_storing', async (req, res) => {
    try {
        var data = await PhotoModel.find({}).select('_id photo stole_item');
        if (data.length <= 0) {
            return res.status(200).json({
                cd: 'Fail',
                msg: 'There is not photos stores.'
            });
        }
        return res.status(200).json({
            data,
            cd: 'Success!',
            msg: 'Photos information.'
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            msg: 'It happened a error.'
        });
    }
});

app.get('/storiing_detail', async (req, res) => {
    try {
        var _id = req.query._id;
        var data = await PhotoModel.findOne({ _id: _id }).lean();
        
        if(data == null) {
            return res.status(200).json({
                cd: 'Fail',
                msg: 'There is not information.'
            });
        }

        return res.status(200).json({
            data,
            cd: 'Success!',
            msg: 'Photo information.'
        });

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            msg: 'It happened a error.'
        });
    }
})

module.exports = app;
