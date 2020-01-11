const express = require("express");
const router = express.Router();
const { getMapById } = require("../lib/queries.js")
const { getQueryResults } = require("../server")

router.get("/:id", async (req, res) => {
  const sql = getMapById(req.params.id);
  const maps = await getQueryResults(sql);
  res.render('browse', { maps });
});

module.exports = router;
