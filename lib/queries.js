const { SQL } = require("sql-template-strings");

exports.getMapById = id => SQL`SELECT * FROM maps WHERE id = ${id}`;

exports.getMaps = () => SQL`
  SELECT maps.name, users.name as owner
  FROM maps
  JOIN users ON users.id = owner_id
  LIMIT 10;`;

exports.createNewMap = (name, ownerId) => SQL`
  INSERT INTO maps (name, owner_id) VALUES
  (${name}, ${ownerId});`;

exports.getLocationsForMapId = mapId => SQL`
  SELECT locations.*
  FROM locations
  JOIN maps ON locations.map_id = maps.id
  WHERE map_id = ${mapId}
  LIMIT 100;`;

exports.createNewLocation = (
  mapId,
  ownerId,
  long,
  lat,
  title,
  description,
  imageUrl
) => SQL`
  INSERT INTO locations (map_id, owner_id, long, lat, title, description, image_url)
  VALUES (${mapId}, ${ownerId}, ${long}, ${lat}, ${title}, ${description}, ${imageUrl});`;

exports.getUserById = id => SQL`SELECT * FROM users WHERE id = ${id};`;

exports.getAllUsers = () => SQL`SELECT * FROM users;`;

exports.createUser = (name, email, password) => SQL`
  INSERT INTO users (name, email, password)
  VALUES (${name}, ${email}, ${password});`;
