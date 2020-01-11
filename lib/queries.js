const { SQL } = require("sql-template-strings");

const getMapById = id => SQL`SELECT * FROM maps WHERE id = ${id}`;

const getUserById = id => SQL`SELECT * FROM users WHERE id = ${id}`;

module.exports = { getMapById, getUserById };
