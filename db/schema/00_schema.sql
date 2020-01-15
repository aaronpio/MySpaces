DROP TABLE IF EXISTS users
CASCADE;

DROP TABLE IF EXISTS maps
CASCADE;

DROP TABLE IF EXISTS locations
CASCADE;

DROP TABLE IF EXISTS favorite_maps
CASCADE;


CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE maps
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES users ON DELETE CASCADE
);

CREATE TABLE locations
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  longitude DOUBLE PRECISION NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  image_url VARCHAR(255),
  map_id INTEGER REFERENCES maps ON DELETE CASCADE,
  owner_id INTEGER REFERENCES users ON DELETE CASCADE
);

CREATE TABLE favorite_maps
(
  id SERIAL PRIMARY KEY,
  map_id INTEGER REFERENCES maps ON DELETE CASCADE,
  user_id INTEGER REFERENCES users ON DELETE CASCADE
);
