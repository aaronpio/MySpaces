const express = require("express");
const router = express.Router();
const { getMapsForUserId, getUserById, getAllUsers, getMapById, getMaps, getLocationsForMapId, createNewMap, createNewLocation, addFavorite, getFavoritesForUserId, removeFavorite, isFavorited } = require("../lib/queries.js");
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
    console.log(sql)
    execQuery(sql).then(mapID => res.json(mapID[0].id))
  })
});


// LOCATIONS
router.get("/locations/:mapid", async (req, res) => {
  const sql = getLocationsForMapId(req.params.mapid)
  execQuery(sql).then(locations => res.json(locations))
})

router.post("/locations", async (req, res) => {
  console.log("BODY", req.body)
  ifLoggedIn(req, res, async (userID) => {
    const { map_id,
            longitude,
            latitude,
            title,
            description,
            image_url } = req.body
    const sql = createNewLocation(map_id, userID, longitude, latitude, title, description, image_url)
    execQuery(sql).then(id => {console.log("ID:", id);res.json(id)})
  })
})

router.post(`/:mapID/update`, (req, res) => {
  console.log('yoyoyoyoy')
  ifLoggedIn(req, res, async (userID) => {
    const mapID = req.params.mapID
    const sql = updateMapById(mapID)
    execQuery(sql).then(() => {
      console.log(`Map with ID: ${mapID} was Updated `)
      res.render('index')
    })
  })
})


// FAVORITES
router.post("/favorites/:mapid/toggle", async (req, res) => {
  ifLoggedIn(req, res, async (userID) => {
    const favoritedSQL = isFavorited(userID, req.params.mapid);
    const isFavoritedResult = await execQuery(favoritedSQL);
    const favorited = isFavoritedResult.length > 0;
    const sql = favorited ? removeFavorite(userID, req.params.mapid) : addFavorite(userID, req.params.mapid);
    console.log(sql)
    execQuery(sql).then(() => res.json("OK"))
  })
})

router.post("/favorites/:mapid/delete", async (req, res) => {
  ifLoggedIn(req, res, async (userID) => {
    const sql = removeFavorite(userID, req.params.mapid)
    execQuery(sql).then(res => res.json("OK"))
  })
})

router.post("/favorites/:mapid", async (req, res) => {
  ifLoggedIn(req, res, async (userID) => {
    const sql = addFavorite(userID, req.params.mapid)
    execQuery(sql).then(res => res.json("OK"))
  })
})

router.get("/favorites", async (req, res) => {
  ifLoggedIn(req, res, async (userID) => {
    const sql = getFavoritesForUserId(userID)
    execQuery(sql).then(favorites => res.json(favorites))
  })
})


module.exports = router;
