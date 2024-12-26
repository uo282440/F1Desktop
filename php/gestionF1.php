<?php
    class F1Database {
        
        private $servername; 
        private $username;
        private $password;
        private $dbname;

        
        public function __construct() {
            $this->servername = "localhost";
            $this->username = "DBUSER2024";
            $this->password = "DBPSWD2024";
            $this->dbname = "gestion";
        }

        private function connect(){
            
            $this->conn = new mysqli($this->servername, $this->username, $this->password);

            if ($this->conn->connect_error) {
                die("Conexión fallida: " . $this->conn->connect_error);
            }
        }

        public function createDatabaseAndTables() {
            $this->connect();
        
            $sql = "CREATE DATABASE IF NOT EXISTS $this->dbname";
            if ($this->conn->query($sql) === TRUE) {
                //echo "Base de datos creada correctamente.<br>";
            } else {
                die("Error al crear la base de datos: " . $this->conn->error);
            }
        
            
            $this->conn->select_db($this->dbname);
        
            
            $tables = [
                "CREATE TABLE IF NOT EXISTS teams (
                    id_team INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    base VARCHAR(100),
                    chief VARCHAR(50)
                )",
                "CREATE TABLE IF NOT EXISTS drivers (
                    id_driver INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) NOT NULL,
                    country VARCHAR(50),
                    id_team INT,
                    FOREIGN KEY (id_team) REFERENCES teams(id_team)
                )",
                "CREATE TABLE IF NOT EXISTS races (
                    id_race INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    date DATE
                )",
                "CREATE TABLE IF NOT EXISTS results (
                    id_result INT AUTO_INCREMENT PRIMARY KEY,
                    id_race INT,
                    id_driver INT,
                    position INT,
                    FOREIGN KEY (id_race) REFERENCES races(id_race),
                    FOREIGN KEY (id_driver) REFERENCES drivers(id_driver)
                )",
                "CREATE TABLE IF NOT EXISTS seasons (
                    id_season INT AUTO_INCREMENT PRIMARY KEY,
                    year INT NOT NULL,
                    champion VARCHAR(50)
                )"
            ];
        
            foreach ($tables as $table) {
                if ($this->conn->query($table) === TRUE) {
                    //echo "Tabla creada correctamente.<br>";
                } else {
                    die("Error al crear la tabla: " . $this->conn->error);
                }
            }
        
            
            $data = [
                "INSERT INTO teams (name, base, chief) VALUES 
                ('Red Bull Racing', 'Milton Keynes', 'Christian Horner'),
                ('Mercedes AMG', 'Brackley', 'Toto Wolff'),
                ('Ferrari', 'Maranello', 'Mattia Binotto'),
                ('McLaren', 'Woking', 'Andreas Seidl'),
                ('Alpine', 'Enstone', 'Otmar Szafnauer')",
        
                "INSERT INTO drivers (name, country, id_team) VALUES 
                ('Max Verstappen', 'Netherlands', 1),
                ('Lewis Hamilton', 'United Kingdom', 2),
                ('Charles Leclerc', 'Monaco', 3),
                ('Lando Norris', 'United Kingdom', 4),
                ('Fernando Alonso', 'Spain', 5),
                ('Sebastian Vettel', 'Germany', 3),
                ('Daniel Ricciardo', 'Australia', 4)",
        
                "INSERT INTO races (name, date) VALUES 
                ('Australian Grand Prix', '2024-03-24'),
                ('Bahrain Grand Prix', '2024-03-31'),
                ('Miami Grand Prix', '2024-05-05'),
                ('Monaco Grand Prix', '2024-05-26'),
                ('Canadian Grand Prix', '2024-06-09')",
        
                "INSERT INTO results (id_race, id_driver, position) VALUES 
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
                (5, 2, 3)",
        
                "INSERT INTO seasons (year, champion) VALUES 
                (2024, 'Max Verstappen'),
                (2023, 'Lewis Hamilton'),
                (2022, 'Charles Leclerc')"
            ];
        
            foreach ($data as $datum) {
                if ($this->conn->query($datum) === TRUE) {
                    //echo "Datos insertados correctamente.<br>";
                } else {
                    die("Error al insertar datos: " . $this->conn->error);
                }
            }
        }
        

        public function importCSV($fileTmpPath) {
            $this->connect();
            $this->conn->select_db($this->dbname);
    
            if (($handle = fopen($fileTmpPath, 'r')) !== FALSE) {
                $header = fgetcsv($handle); 
    
                while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
                    if (count($data) === 3) {
                        $name = $this->conn->real_escape_string($data[0]);
                        $country = $this->conn->real_escape_string($data[1]);
                        $id_team = (int)$data[2];
    
                        $sql = "INSERT INTO drivers (name, country, id_team) VALUES ('$name', '$country', $id_team)";
                        if (!$this->conn->query($sql)) {
                            echo "Error al insertar el registro: " . $this->conn->error . "<br>";
                        }
                    } else {
                        echo "Formato incorrecto en el archivo CSV.<br>";
                    }
                }
                fclose($handle);
            } else {
                echo "Error al abrir el archivo.";
            }
    
            $this->conn->close();
        }


        public function getDriversWithTeams() {
            $this->connect();
            $this->conn->select_db($this->dbname);
        
            $sql = "SELECT drivers.name as driver_name, drivers.country, teams.name as team_name
                    FROM drivers 
                    INNER JOIN teams ON drivers.id_team = teams.id_team";
            $result = $this->conn->query($sql);
            $drivers = [];
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $drivers[] = $row;
                }
            }
            $this->conn->close();
            return $drivers;
        }

        public function getRaceWinsByDriver() {
            $this->connect();
            $this->conn->select_db($this->dbname);
        
            $sql = "SELECT drivers.name AS driver_name, COUNT(results.id_result) AS wins
                    FROM results
                    INNER JOIN drivers ON results.id_driver = drivers.id_driver
                    WHERE results.position = 1
                    GROUP BY drivers.name
                    ORDER BY wins DESC";
            $result = $this->conn->query($sql);
            $wins = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $wins[] = $row;
                }
            }
            $this->conn->close();
            return $wins;
        }

        public function getDriverStandings() {
            $this->connect();
            $this->conn->select_db($this->dbname);
        
            
            $sql = "SELECT drivers.name AS driver_name, 
                           SUM(CASE 
                                WHEN results.position = 1 THEN 25
                                WHEN results.position = 2 THEN 18
                                WHEN results.position = 3 THEN 15
                                ELSE 0 
                           END) AS total_points
                    FROM results
                    INNER JOIN drivers ON results.id_driver = drivers.id_driver
                    GROUP BY drivers.name
                    ORDER BY total_points DESC";
        
            $result = $this->conn->query($sql);
            $standings = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $standings[] = $row;
                }
            }
            $this->conn->close();
            return $standings;
        }
        

        public function getSeasonChampions() {
            $this->connect();
            $this->conn->select_db($this->dbname);
        
            $sql = "SELECT year, champion FROM seasons ORDER BY year DESC";
            $result = $this->conn->query($sql);
            $champions = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $champions[] = $row;
                }
            }
            $this->conn->close();
            return $champions;
        }
        
    }

    

    if (isset($_POST['create_db'])) {
        $f1db = new F1Database();
        $f1db->createDatabaseAndTables();
    }

    if (isset($_POST['import_csv'])) {
        if (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['csv_file']['tmp_name'];
            $f1db = new F1Database();
            $f1db->importCSV($fileTmpPath);
        } else {
            echo "Error al subir el archivo.";
        }
    }

        
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>JUEGOS</title>


    <meta name ="author" content ="uo282440 Pablo Jose Perez Diez" />
    <meta name ="description" content ="pagina de Juegos" />
    <meta name ="keywords" content ="aquí cada documento debe tener la lista
        de las palabras clave del mismo separadas por comas" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="../estilo/estilo.css" />

     
    <!-- Enlace del icono -->
    <link rel="icon" href="../multimedia/imagenes/favicon.ico" type="image/png">
    <link rel="stylesheet" href="../estilo/layout.css">

</head>

<body>
    
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>

        <h1>
            <a href="../index.html">F1 Desktop</a>
        </h1>

        <nav>
            <a href="../index.html">Inicio</a>
            <a href="../calendario.html">Calendario</a>
            <a href="../circuito.html">Circuito</a>
            <a href="../juegos.html" class="active">Juegos</a>
            <a href="../meteorologia.html">Meteorologia</a>
            <a href="../noticias.html">Noticias</a>
            <a href="../piloto.html">Piloto</a>
            <a href="../viajes.php">Viajes</a>
        </nav>

    </header>

    <p data-migas="true">Estás en: <a href="index.html"><u><strong>Inicio</strong></u></a> >> Juegos</p>


    <section>
        <h2>Juegos</h2>
        <nav>
            <a href="../memoria.html">Juego de Memoria</a>
            <a href="../semaforo.php">Juego tiempo de Reaccion</a>
            <a href="../api.html">Trivia Circuito Cercano</a>
        </nav>
    </section>

    <main>
        
        <section>
            <h6>BD</h6>

            <p>1 - Cree la Base de Datos</p>

            <form method="POST">
                <button type="submit" name="create_db">Crear Base de Datos</button>
                <br><br>
            </form>
            
        </section>

        <section>
            <h6>Subir Data</h6>

            <p>2 - Seleccione y después suba el CSV</p>
            
            <form method="POST" enctype="multipart/form-data">
                <button type="button" onclick="document.querySelector('main section:nth-child(2) input[type=&quot;file&quot;]').click();">Seleccionar archivo CSV</button>
                <input type="file" name="csv_file" accept=".csv">
                <button type="submit" name="import_csv">Subir CSV a la BD</button>
            </form>
            
        </section>

        <section>
            <h6>Consultas</h6>
            <form method="POST">
                
                <button type="submit" name="show_drivers_teams">Mostrar Pilotos y Equipos</button>
                <button type="submit" name="show_race_wins">Carreras Ganadas por Piloto</button>
                <button type="submit" name="show_driver_standings">Clasificación de Pilotos</button>
                <button type="submit" name="show_season_champions">Campeones por Temporada</button>
    
            </form>
        </section>

        <section>
            <h6>Iprimir</h6>
            <?php 

                echo "";

                if (isset($_POST['show_drivers_teams'])) {
                    $f1db = new F1Database();
                    $drivers = $f1db->getDriversWithTeams();
                    foreach ($drivers as $driver) {
                        echo "<p>Piloto: {$driver['driver_name']} ({$driver['country']}) - Equipo: {$driver['team_name']}</p>";
                    }
                }

                if (isset($_POST['show_race_wins'])) {
                    $f1db = new F1Database();
                    $wins = $f1db->getRaceWinsByDriver();
                    foreach ($wins as $win) {
                        echo "<p>Piloto: {$win['driver_name']} - Victorias: {$win['wins']}</p>";
                    }
                }
        
                if (isset($_POST['show_driver_standings'])) {
                    $f1db = new F1Database();
                    $standings = $f1db->getDriverStandings();
                    foreach ($standings as $standing) {
                        echo "<p>Piloto: {$standing['driver_name']} - Puntos Totales: {$standing['total_points']}</p>";
                    }
                }
        
                if (isset($_POST['show_season_champions'])) {
                    $f1db = new F1Database();
                    $champions = $f1db->getSeasonChampions();
                    foreach ($champions as $champion) {
                        echo "<p>Año: {$champion['year']} - Campeón: {$champion['champion']}</p>";
                    }
                }
            ?>

        </section>

    </main>
 

</body>
</html>