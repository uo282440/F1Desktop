<?php
    class Record {
       
        private $server; 
        private $user;
        private $pass;
        private $dbname;

       
        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }

        private function conecta(){
            try {
                $dsn = "mysql:host={$this->server};dbname={$this->dbname};charset=utf8mb4";
                return new PDO($dsn, $this->user, $this->pass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
            } catch (PDOException $e) {
                die("Error al conectar con la base de datos: " . $e->getMessage());
            }
        }

        public function insertaRegistro($nombre, $apellidos, $nivel, $tiempo) {
            $sql = "INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (:nombre, :apellidos, :nivel, :tiempo)";
            try {
                $pdo = $this->conecta();
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':nombre' => $nombre,
                    ':apellidos' => $apellidos,
                    ':nivel' => $nivel,
                    ':tiempo' => $tiempo,
                ]);
                
            } catch (PDOException $e) {
                echo "<p>Error al insertar el registro: " . $e->getMessage() . "</p>";
            }
        }

        public function getTop10($nivel) {
            $sql = "SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = :nivel ORDER BY tiempo ASC LIMIT 10";
            try {
                $pdo = $this->conecta();
                $stmt = $pdo->prepare($sql);
                $stmt->execute([':nivel' => $nivel]);
                $results = $stmt->fetchAll();
    
                return $results; // Retornamos los resultados
            } catch (PDOException $e) {
                echo "<p>Error al obtener las puntuaciones: " . $e->getMessage() . "</p>";
                return [];
            }
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

    <link rel="stylesheet" href="estilo/estilo.css" />

     
    <!-- Enlace del icono -->
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/png">
    <link rel="stylesheet" href="estilo/semaforo_grid.css">
    <link rel="stylesheet" href="estilo/layout.css">
    <script src="js/semaforo.js"></script>

</head>

<body>
    
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>

        <h1>
            <a href="index.html">F1 Desktop</a>
        </h1>

        <nav>
            <a href="index.html">Inicio</a>
            <a href="calendario.html">Calendario</a>
            <a href="circuito.html">Circuito</a>
            <a href="juegos.html" class="active">Juegos</a>
            <a href="meteorologia.html">Meteorologia</a>
            <a href="noticias.html">Noticias</a>
            <a href="piloto.html">Piloto</a>
            <a href="viajes.php">Viajes</a>
        </nav>

    </header>

    <p data-migas="true">Estás en: <a href="index.html"><u><strong>Inicio</strong></u></a> >> Juegos</p>


    <section>
        <h2>Juegos</h2>
        <nav>
            <a href="memoria.html">Juego de Memoria</a>
            <a href="semaforo.php"><u><b>Juego tiempo de Reaccion</b></u></a>
            <a href="api.html">Trivia Circuito Cercano</a>
            <a href="php/gestionF1.php">Gestion F1</a>
        </nav>
    </section>

    <main>
        
        
    </main>

    <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                
                $nombre = $_POST['nombre'] ?? 'No definido';
                $apellidos = $_POST['apellidos'] ?? 'No definido';
                $nivel = $_POST['nivel'] ?? 'No definido';
                $tiempo = $_POST['tiempo'] ?? 'No definido';
            
                $record = new Record();
                $record->insertaRegistro($nombre, $apellidos, $nivel, $tiempo);
                $scores = $record->getTop10($nivel);

                if (!empty($scores)) {
                    echo "<h3>Top 10 Mejores Puntuaciones para el Nivel {$nivel}</h3>";
                    echo "<ol>"; 
                    foreach ($scores as $score) {
                        echo "<li>{$score['nombre']} {$score['apellidos']} - {$score['tiempo']} ms</li>";
                    }
                    echo "</ol>";
                }
            }
    ?>

    <script>
        var semaforo = new Semaforo();
        semaforo.createStructure();
    </script> 

</body>
</html>