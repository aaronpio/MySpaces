const express = require("express");
const router = express.Router();
const { getMapById, getMaps } = require("../lib/queries.js");
const { getQueryResults } = require("../server");


router.get("/", async (req, res) => {
  const sql = getMaps();
  getQueryResults(sql).then(maps => res.json(maps));
});

router.get("/new", (req, res) => {
  res.render("create-map");
});

router.get("/:id", async (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(map => res.json(map));
});

module.exports = router;
