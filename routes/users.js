const express = require("express");
const router = express.Router();
const { getUserById, getAllUsers, getMapsForUserId } = require("../lib/queries.js");
const { getQueryResults } = require("../server");
const { db } = require("../server");

router.get("/:id/maps", (req, res) => {
  const sql = getMapsForUserId(req.params.id);
  getQueryResults(sql).then(maps => res.json(maps));
})


router.get("/:id", (req, res) => {
  const sql = getUserById(req.params.id);
  getQueryResults(sql).then(user => res.json(user[0]));
});


router.get("/", (req, res) => {
  const sql = getAllUsers();
  getQueryResults(sql).then(users => res.json(users));
});


module.exports = router;
