const express = require("express");
const router = express.Router();
const { getMapById } = require("../lib/queries")
const { execQuery, ifLoggedIn } = require("../server")

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/new", (req, res) => {
  res.render("create-map");
});

router.get("/:id", async (req, res) => {
  const sql = getMapById(req.params.id)
  const result = await getQueryResults(sql)
  const map = result[0]
  res.render("map", { map });
});

module.exports = router;
