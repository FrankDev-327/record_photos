'use strict';

const { TrackCaseModel } = require('../model/index');
const { Cloudinary } = require('../cloundary.config/cloundary.setup');


async function insertDataAboutCase(req, res) {
    try {
        var params = req.body;
        Cloudinary.uploader.upload(params.img,
            async function (err, result) {
                if (err) {
                    return res.status(301).json({
                        cd: 'No Success!',
                        message: 'It was not possible to store the image. Try again.'
                    });
                }

                var photoFromCloud = result.secure_url;
                var trackCase = new TrackCaseModel({
                    ...params, photo: photoFromCloud
                });

                var data = await trackCase.save();
                if (data) {
                    return res.status(301).json({
                        cd: 'No Success!',
                        msg: 'It was not possible to store the information. Try again!.'
                    });
                }
                return res.status(200).json({
                    cd: 'Success!',
                    msg: 'The information was stored correctly!'
                });
            });
    } catch (error) {
        return res.status(401).json({
            cd: 'No Success!',
            msg: 'It has ocurred a error.'
        });
    }
}

async function listsDataAboutCases(req, res) {
    try {
        var data = await PhotoModel.find({}).select('_id photo stole_item').lean();
        if (data.length <= 0) {
            return res.status(301).json({
                cd: 'Fail',
                msg: 'There is not cases stored.'
            });
        }
        return res.status(201).json({
            data,
            cd: 'Success!',
            msg: 'Cases information.'
        });
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            cd: 'No Success!',
            msg: 'It has ocurred a error.'
        });
    }
}

async function caseInformation(req, res) {
    try {
        var _id = req.params._id;
        var data = await PhotoModel.findOne({ _id: _id }).lean();

        if (data == null) {
            return res.status(301).json({
                cd: 'Fail',
                msg: 'There is not information.'
            });
        }

        return res.status(201).json({
            data,
            cd: 'Success!',
            msg: 'Photo information.'
        });

    } catch (error) {
        return res.status(200).json({
            cd: 'No Success!',
            msg: 'It has ocurred a error.'
        });
    }
}


module.exports = {
    caseInformation,
    insertDataAboutCase,
    listsDataAboutCases
}