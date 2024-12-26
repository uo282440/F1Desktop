-- Archivo: create_and_insert_data.sql

-- Creación de la tabla 'teams'
CREATE TABLE IF NOT EXISTS teams (
    id_team INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    base VARCHAR(100),
    chief VARCHAR(50)
);

-- Creación de la tabla 'drivers'
CREATE TABLE IF NOT EXISTS drivers (
    id_driver INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    country VARCHAR(50),
    id_team INT,
    FOREIGN KEY (id_team) REFERENCES teams(id_team)
);

-- Creación de la tabla 'races'
CREATE TABLE IF NOT EXISTS races (
    id_race INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    date DATE
);

-- Creación de la tabla 'results'
CREATE TABLE IF NOT EXISTS results (
    id_result INT AUTO_INCREMENT PRIMARY KEY,
    id_race INT,
    id_driver INT,
    position INT,
    FOREIGN KEY (id_race) REFERENCES races(id_race),
    FOREIGN KEY (id_driver) REFERENCES drivers(id_driver)
);

-- Creación de la tabla 'seasons'
CREATE TABLE IF NOT EXISTS seasons (
    id_season INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL,
    champion VARCHAR(50)
);

-- Inserción de datos en la tabla 'teams'
INSERT INTO teams (name, base, chief) VALUES 
    ('Red Bull Racing', 'Milton Keynes', 'Christian Horner'),
    ('Mercedes AMG', 'Brackley', 'Toto Wolff'),
    ('Ferrari', 'Maranello', 'Mattia Binotto'),
    ('McLaren', 'Woking', 'Andreas Seidl'),
    ('Alpine', 'Enstone', 'Otmar Szafnauer');

-- Inserción de datos en la tabla 'drivers'
INSERT INTO drivers (name, country, id_team) VALUES 
    ('Max Verstappen', 'Netherlands', 1),
    ('Lewis Hamilton', 'United Kingdom', 2),
    ('Charles Leclerc', 'Monaco', 3),
    ('Lando Norris', 'United Kingdom', 4),
    ('Fernando Alonso', 'Spain', 5),
    ('Sebastian Vettel', 'Germany', 3),
    ('Daniel Ricciardo', 'Australia', 4);

-- Inserción de datos en la tabla 'races'
INSERT INTO races (name, date) VALUES 
    ('Australian Grand Prix', '2024-03-24'),
    ('Bahrain Grand Prix', '2024-03-31'),
    ('Miami Grand Prix', '2024-05-05'),
    ('Monaco Grand Prix', '2024-05-26'),
    ('Canadian Grand Prix', '2024-06-09');

-- Inserción de datos en la tabla 'results'
INSERT INTO results (id_race, id_driver, position) VALUES 
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (1, 4, 4),
    (2, 2, 1),
    (2, 1, 3),
    (3, 4, 1),
    (3, 5, 2),
    (4, 3, 1),
    (4, 6, 2),
    (5, 5, 1),
    (5, 2, 3);

-- Inserción de datos en la tabla 'seasons'
INSERT INTO seasons (year, champion) VALUES 
    (2024, 'Max Verstappen'),
    (2023, 'Lewis Hamilton'),
    (2022, 'Charles Leclerc');
