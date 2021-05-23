'use strict';

const express = require('express');
const router = express.Router();
const { TrackCaseController } = require('../controller/index');
//--
router.post('/case', TrackCaseController.insertDataAboutCase);
router.get('/cases', TrackCaseController.listsDataAboutCases);
router.get('/case/:_id', TrackCaseController.caseInformation);
router.put('/case/:_id', TrackCaseController.uploadAdnUpdateCaseImage);

module.exports = router;