const express = require("express");
const router = express.Router();
const { getUserById, getAllUsers } = require("../lib/queries.js");
const { getQueryResults } = require("../server");
const { db } = require("../server");


router.get("/", (req, res) => {
  res.render("create-map")
});

module.exports = router;
