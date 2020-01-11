const express = require("express");
const router = express.Router();
const { getMapById, getMaps } = require("../lib/queries.js");
const { getQueryResults } = require("../server");

router.get("/:id", async (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(map => res.json(map));
});

router.get("/", async (req, res) => {
  const sql = getMaps();
  getQueryResults(sql).then(maps => res.json(maps));
});

module.exports = router;
