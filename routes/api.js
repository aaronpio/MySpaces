const express = require("express");
const router = express.Router();
const { getMapsForUserId, getUserById, getAllUsers, getMapById, getMaps, getLocationsForMapId, createNewMap } = require("../lib/queries.js");
const { execQuery, ifLoggedIn } = require("../server");

// USERS
router.get("/users/:id/maps", (req, res) => {
  const sql = getMapsForUserId(req.params.id);
  execQuery(sql).then(maps => res.json(maps));
})

router.get("/users/:id", (req, res) => {
  const sql = getUserById(req.params.id);
  execQuery(sql).then(users => res.json(users[0]));
});

router.get("/users/", (req, res) => {
  const sql = getAllUsers();
  execQuery(sql).then(users => res.json(users));
});


// MAPS
router.get("/maps", async (req, res) => {
  const sql = getMaps();
  execQuery(sql).then(maps => res.json(maps));
});

router.get("/maps/:id", async (req, res) => {
  const sql = getMapById(req.params.id);
  execQuery(sql).then(maps => res.json(maps)[0]);
});

router.post("/maps", async (req, res) => {
  ifLoggedIn(req, res, async (userID) => {
    const sql = createNewMap(req.body.mapName, userID)
    execQuery(sql).then(mapID => res.json(mapID[0].id))
  })
});


// LOCATIONS
router.get("/locations/:mapid", async (req, res) => {
  const sql = getLocationsForMapId(req.params.mapid)
  execQuery(sql).then(locations => res.json(locations))
})

router.post("/locations", async (req, res) => {
  console.log(req.body)
  //const sql = createNewLocation()

})

module.exports = router;
