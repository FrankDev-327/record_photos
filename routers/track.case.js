'use strict';

const express = require('express');
const router = express.Router();
const {
    caseInformation,
    insertDataAboutCase,
    listsDataAboutCases,
    uploadAdnUpdateCaseImage
} = require('../controller/track.case');

router.post('/case', insertDataAboutCase);
router.get('/cases', listsDataAboutCases);
router.get('/case/:_id', caseInformation);
router.put('/case/:_id', uploadAdnUpdateCaseImage);

module.exports = router;