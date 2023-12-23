CREATE DATABASE pernnotes;
\c pernnotes;
CREATE TABLE notes ( 
    ID SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR(1024),
    date VARCHAR(10),
    time VARCHAR(11)
);
