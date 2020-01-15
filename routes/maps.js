const express = require("express");
const router = express.Router();
const { getMapById, deleteMapById } = require("../lib/queries")
const { execQuery, ifLoggedIn } = require("../server")

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/new", (req, res) => {
  res.render("create-map");
});

router.get("/:id", async (req, res) => {
  const sql = getMapById(req.params.id)
  const result = await execQuery(sql)
  const map = result[0]
  res.render("map", { map });
});

router.post(`/:mapID/delete`, (req, res) => {
  const mapID = req.params.mapID
  ifLoggedIn(req, res, async (userID) => {
    const sql = deleteMapById(mapID)
    execQuery(sql).then(() => {
      console.log(`Map with ID: ${mapID} was Deleted `)
      res.render('index')
    })
  })
})

module.exports = router;
