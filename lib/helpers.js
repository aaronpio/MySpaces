module.exports = db => {
  return {
    getQueryResults: async sql => {
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

