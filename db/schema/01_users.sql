DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(500) NOT NULL,
  profile_pic VARCHAR (255)
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(500) NOT NULL,
  thumbnail_photo VARCHAR (255)
);

CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  comment TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating SMALLINT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE
);
