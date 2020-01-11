const express = require("express");
const router = express.Router();
const { getMapById } = require("../lib/queries.js")
const { getQueryResults } = require("../server")

router.get("/:id", async (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(map => res.json(map));
});

module.exports = router;
