const express = require("express");
const router = express.Router();
const { getUserById, getAllUsers, getMapsForUserId } = require("../lib/queries.js");
const { execQuery } = require("../server");


module.exports = router;
