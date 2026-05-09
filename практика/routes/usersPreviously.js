// Express Import
const express = require("express");
const router = express.Router();


// Other Import
const bodyParser = require('body-parser');
const usersPreviouslyController = require('../controllers/usersPreviously');


// For Get Data req.body
router.use(bodyParser.urlencoded());


// Get Data And Redirect User By Necessar Url
// Update
router.post("/update",usersPreviouslyController.update);

// Add
router.post("/addUser", usersPreviouslyController.add);

// Delete
router.post("/delete", usersPreviouslyController.delete);

// Get User Bt Id
router.post("/id", usersPreviouslyController.getUserById);


// Export
module.exports = router;