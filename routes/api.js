const express = require("express");
const router = express.Router();
const { getAllUsers, getMapById, getUserById } = require("../lib/queries.js")
const { getQueryResults } = require("../server")

router.get("/maps/:id", (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(maps => res.json(maps));
});

router.get("/users/:id", (req, res) => {
  const sql = getUserById(req.params.id);
  getQueryResults(sql).then(users => res.json(users));
});

router.get("/users", (req, res) => {
  const sql = getAllUsers();
  getQueryResults(sql).then(users => res.json(users));
});

module.exports = router;
