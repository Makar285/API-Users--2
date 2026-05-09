// Express Import
const express = require("express");
const router = express.Router();


// Other Import
const fs = require("fs");
const helpers = require('../helpers');
const usersBeforeController = require('../controllers/users/before');
const usersAfterController = require('../controllers/users/after');


// Variables
const config = require('../config');


// Routings:
// Update Data User
router.get(/\/update\/id=(\d+)&name=([^&]+)&age=(\d+)&isDelete=(true|false)/, usersAfterController.update);

// Add User
router.get(/\/addUser\/name=([^&]+)&age=(\d+)&isDelete=(true|false)/, usersAfterController.add);

// Delete User By Id
router.get(/\/delete\/id=(\d+)/, usersAfterController.delete);

// Return The User By Id
router.get(/\/id=(\d+)/, usersAfterController.getUserById);

router.get('/id', usersBeforeController.getUserById);

router.get('/update', usersBeforeController.update);

router.get('/add', usersBeforeController.add);

router.get('/delete', usersBeforeController.delete);

// Return All Users
router.get("/", usersAfterController.getAllUsers);


// Export
module.exports = router;
