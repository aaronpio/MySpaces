const express = require("express");
const router = express.Router();
const { getMapById } = require("../lib/queries.js")
const { getQueryResults } = require("../server")

router.get("/:id", (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(maps => res.json(maps));
});

module.exports = router;
