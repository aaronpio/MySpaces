module.exports = db => {
  return {
    execQuery: async sql => {
      console.log("SQL:", sql)
      return db
        .query(sql)
        .then(res => res.rows)
        .catch(err => console.log(err));
    },

    ifLoggedIn: (req, res, resolve) => {
      const userID = req.cookies["user-id"];
      if (userID) {
        resolve(userID);
      } else {
        res.redirect("/login");
      }
    }
  }
}

