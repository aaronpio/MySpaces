/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUserById, getAllUsers } = require("../lib/queries.js");
const { getQueryResults } = require("../server");
const { db } = require("../server");

//-------------------------------------------
router.get("/:id", (req, res) => {
  db.query(getUserById(req.params.id))
    .then(data => {
      const user = data.rows[0];
      res.json({ user });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});
//-------------------------------------------

router.get("/", (req, res) => {
  const sql = getAllUsers();
  getQueryResults(sql).then(users => res.json(users));
});


module.exports = router;
