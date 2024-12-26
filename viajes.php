<?php
    class Carrusel {
        
        private $capital;
        private $pais;

        public function __construct($capital, $pais) {
            $this->capital = $capital;
            $this->pais = $pais;
        }


        public function getFotos($pais) {
            $api_key = '0565634739c78dcdbf56368cb0991f0b';
            $tag = $pais;
            $perPage = 10;
            // Fotos públicas recientes
            $url = 'https://api.flickr.com/services/feeds/photos_public.gne?';
            $url.= '&api_key='.$api_key;
            $url.= '&tags='.$tag;
            $url.= '&per_page='.$perPage;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            if($json==null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            }

            $fotos = [];

            for($i=0; $i<$perPage; $i++) {
                
                $titulo = $json->items[$i]->title;
                $URLfoto = $json->items[$i]->media->m;       
                $fotoConcreta = "<img alt='".$titulo."' src='".$URLfoto."' />";

                $fotos[$i] = $fotoConcreta;
            }

            return $fotos;
        }
    }  
    
    class Moneda {
        public function __construct($local, $otra) {
            $this->local = $local;
            $this->otra = $otra;
        }

        public function obtenerTasaCambio($baseCurrency, $targetCurrency) {
            $apiKey = 'd7c6a04bf96eb55338a92591'; 
            $apiUrl = "https://api.exchangerate-api.com/v4/latest/{$baseCurrency}";
        
            $response = file_get_contents($apiUrl);
            $data = json_decode($response, true);
        
            
            if (!$data || !isset($data['rates'][$targetCurrency])) {
                return false; 
            }
        
            $rate = $data['rates'][$targetCurrency];
        
            return $rate;
        }
        

    }
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>VIAJES</title>


    <meta name ="author" content ="uo282440 Pablo Jose Perez Diez" />
    <meta name ="description" content ="pagina de Viajes" />
    <meta name ="keywords" content ="aquí cada documento debe tener la lista
        de las palabras clave del mismo separadas por comas" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />


    <!-- Enlace del icono -->
    <link rel="icon" href="multimedia/imagenes/favicon.ico" type="image/png">
    
    <link rel="stylesheet" href="estilo/estilo.css">
    <link rel="stylesheet" href="estilo/layout.css">

   
    <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=initMapaDinamicoGlobal" async defer></script> -->
    <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=initGoogleMap&loading=async" async defer></script> -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=initGoogleMap&libraries=marker&loading=async" async defer></script>


    <script 
        src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
        crossorigin="anonymous">
    </script>

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
            <a href="juegos.html">Juegos</a>
            <a href="meteorologia.html">Meteorologia</a>
            <a href="noticias.html">Noticias</a>
            <a href="piloto.html">Piloto</a>
            <a href="viajes.php" class="active">Viajes</a>
        </nav>

    </header>

    <!--Migas de navegacion-->
    <p data-migas="true">Estás en: <a href="index.html"><u><strong>Inicio</strong></u></a> >> Viajes </p>

    <h2>Viajes</h2>

    <section>
        <h6>Para warnings</h6>
        <?php 
            $monedaOrigen = 'EUR';
            $monedaDestino = 'CAD';
            $cantidad = 1; 

            $moneda = new Moneda($monedaOrigen, $monedaDestino);
            
            $euroAmount = 1;
            $exchangeRate = $moneda->obtenerTasaCambio($monedaOrigen, $monedaDestino);

            if ($exchangeRate !== false) {
                $cadAmount = $euroAmount * $exchangeRate;
                echo "1 Euro es igual a {$cadAmount} CAD.";
            } else {
                echo "No se pudo obtener la tasa de cambio.";
            }
        ?>
    </section>

    <main>
        <section>
            <h6>Para warnings</h6>
        </section>

        
    </main>

    <section>
        <h6>Para warnings</h6>
        <?php
                $pais = 'Canada';
                $ciudad = 'Ottawa';
                $carrusel = new Carrusel($ciudad, $pais);
                
                $fotos = $carrusel->getFotos($pais);  

                echo "<article>";
                echo "<h6>Para warnings</h6>";
                for($i=0; $i<10; $i++) {
                    print $fotos[$i];
                }
                echo "</article>";


        ?>

        <button> &gt; </button>
        <button> &lt; </button>
    </section>    

    <script src="js/viajes.js"></script>
</body>
</html>