CREATE DATABASE pernnotes;
\c pernnotes;
CREATE TABLE notes ( 
    ID SERIAL PRIMARY KEY,
    title VARCHAR(64),
    body VARCHAR(1024),
    date VARCHAR(10)
);
INSERT INTO notes (title, body, date) VALUES
    ('Note1', 'This is the body of note 1', '10/10/2323'), 
    ('Note2', 'This is the body of note 2', '10/10/2333');
SELECT * FROM notes;
