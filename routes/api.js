const express = require("express");
const router = express.Router();
const { getMapsForUserId, getUserById, getAllUsers, getMapById, getMaps } = require("../lib/queries.js");
const { getQueryResults } = require("../server");

// USERS
router.get("/users/:id/maps", (req, res) => {
  const sql = getMapsForUserId(req.params.id);
  getQueryResults(sql).then(maps => res.json(maps));
})

router.get("/users/:id", (req, res) => {
  const sql = getUserById(req.params.id);
  getQueryResults(sql).then(users => res.json(users[0]));
});

router.get("/users/", (req, res) => {
  const sql = getAllUsers();
  getQueryResults(sql).then(users => res.json(users));
});


// MAPS
router.get("/maps", async (req, res) => {
  const sql = getMaps();
  getQueryResults(sql).then(maps => res.json(maps));
});

router.get("/maps/:id", async (req, res) => {
  const sql = getMapById(req.params.id);
  getQueryResults(sql).then(maps => res.json(maps)[0]);
});

router.post("/maps", async (req, res) => {
  console.log(req.params.body)
  ifLoggedIn((req, res))
  const { name } = req.params.body;

  const sql = createNewMap(name ,);
  getQueryResults(sql).then(_ => res.sendStatus(200));
});


module.exports = router;
