const { SQL } = require("sql-template-strings");

exports.getMapById = id => SQL`SELECT * FROM maps WHERE id = ${id}`;

exports.getMaps = () => SQL`SELECT * FROM maps LIMIT 10`;



exports.getUserById = id => SQL`SELECT * FROM users WHERE id = ${id}`;

exports.getAllUsers = () => SQL`SELECT * FROM users`;

