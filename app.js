'use strict';

require('dotenv').config();
const Cloudinary = require('cloudinary').v2;
Cloudinary.config({
    cloud_name: process.env.CLOUNDRY_NAME,
    api_key: process.env.CLOUNDRY_API_KEY,
    api_secret: process.env.CLOUNDRY_API_SECRET_KEY
});

const PhotoModel = require('./photo.detail.model');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));

app.post('/storing_photos', async (req, res) => {
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
                    detail_photo: params.detail_photo
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

app.get('/list_stoting', async (req, res) => {
    try {
        var data = await PhotoModel.find({}).lean();
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

app.get('/stroting_detail', async (req, res) => {
    try {
        var _id = req.query._id;
        var data = await PhotoModel.findOne({ _id: _id }).select('detail_photo photo');
        
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