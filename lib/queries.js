const { SQL } = require("sql-template-strings");

// MAPS
exports.getMapById = id => SQL`SELECT * FROM maps WHERE id = ${id}`;

exports.getMaps = () => SQL`
  SELECT maps.id, maps.name, owner_id, users.name as owner
  FROM maps
  JOIN users ON users.id = owner_id
  LIMIT 10;`;

exports.createNewMap = (name, ownerId) => SQL`
  INSERT INTO maps (name, owner_id) VALUES
  (${name}, ${+ownerId}) RETURNING maps.id;`;

exports.deleteMapById = (mapID) => SQL`
  DELETE FROM maps WHERE maps.id = ${mapID};`;


// LOCATIONS
exports.getLocationsForMapId = mapId => SQL`
  SELECT locations.*
  FROM locations
  JOIN maps ON locations.map_id = maps.id
  WHERE map_id = ${+mapId}
  LIMIT 100;`;

exports.createNewLocation = (
  map_id,
  owner_id,
  longitude,
  latitude,
  title,
  description,
  image_url
) => SQL`
  INSERT INTO locations (map_id, owner_id, longitude, latitude, title, description, image_url)
  VALUES (${+map_id}, ${+owner_id}, ${+longitude}, ${+latitude}, ${title}, ${description}, ${image_url})
  RETURNING id;`;

// exports.deleteAllLocationsForMapId = mapId => SQL`
//   DELETE FROM locations
//   WHERE locations.map_id = ${mapId}`;

exports.deleteLocationForId = locationID => SQL`
  DELETE FROM locations
  WHERE locations.id = ${locationID}`;


// USERS
exports.getUserById = id => SQL`SELECT * FROM users WHERE id = ${id};`;

exports.getAllUsers = () => SQL`SELECT * FROM users;`;

exports.createUser = (name, email, password) => SQL`
  INSERT INTO users (name, email, password)
  VALUES (${name}, ${email}, ${password});`;

exports.getMapsForUserId = userID => SQL`
  SELECT maps.*
  FROM maps
  JOIN users ON owner_id = users.id
  WHERE users.id = ${+userID};`;


// FAVORITES
exports.getFavoritesForUserId = userID => SQL`
  SELECT maps.id as map_id, maps.name FROM favorite_maps
  JOIN maps ON maps.id= map_id
  WHERE user_id = ${+userID};`;

exports.addFavorite = (userID, mapID) => SQL`
  INSERT INTO favorite_maps (map_id, user_id)
  VALUES (${+mapID}, ${+userID});`;

exports.removeFavorite = (userID, mapID) => SQL`
  DELETE FROM favorite_maps
  WHERE map_id = ${+mapID} AND user_id = ${+userID};`;

exports.isFavorited = (userID, mapID) => SQL`
  SELECT * FROM favorite_maps WHERE map_id = ${+mapID} AND user_id = ${+userID};`;
