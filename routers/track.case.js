'use strict';

const express = require('express');
const router = express.Router();
const { TrackCaseController } = require('../controller/index');
//--
router.post('/case', TrackCaseController.insertDataAboutCase);
router.get('/cases', TrackCaseController.listsDataAboutCases);
router.get('/case/:_id', TrackCaseController.caseInformation);

module.exports = router;