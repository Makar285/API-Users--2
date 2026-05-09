// Express Import
const express = require("express");
const router = express.Router();


// Import My FIle
const startConroller = require('../controllers/start');


// Render Main Page
router.use('/', startConroller.startPage);


// Export
module.exports = router;