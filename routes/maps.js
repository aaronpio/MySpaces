/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getMapById } = require("../lib/queries.js")
const { getQueryResults } = require("../server")

router.get("/:id", (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(maps => res.json(maps));
});

module.exports = router;
