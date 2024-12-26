class Viajes {

    constructor() {
        
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion) {
        
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.latitud = posicion.coords.latitude;
        this.longitud = posicion.coords.longitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;

        
        if (this.coordenadasValidas()) {
            
            this.getMapaEstaticoGoogle();
            this.initMapaDinamico();  
            
        } else {
            console.error('Coordenadas no válidas:', this.latitud, this.longitud);
        }
    }

    

    
    coordenadasValidas() {
        return !isNaN(this.latitud) && !isNaN(this.longitud) && this.latitud !== 0 && this.longitud !== 0;
    }

    getMapaEstaticoGoogle() {
        const main = document.querySelector('main section');

        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var size = "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + size + marcador + sensor + apiKey;
        main.innerHTML = "<h6>Mapa</h6><img src='" + this.imagenMapa + "' alt='mapa estático google' />";
    }

    initMapaDinamico() {
        const main = document.querySelector('main');
    
        const divMapa = document.createElement('div');
    
        main.appendChild(divMapa);
    
        
        this.cargarMapaDinamico(divMapa);
    }
    

    cargarMapaDinamico(divMapa) {
        
        const map = new google.maps.Map(divMapa, {
            center: { lat: this.latitud, lng: this.longitud },
            zoom: 15,
            
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            fullscreenControl: true, 
        });
        
        
        const marker = new google.maps.Marker({
            position: { lat: this.latitud, lng: this.longitud },
            map: map,
            title: "Ubicación actual"
        });
    }

    verErrores(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }
}


function initGoogleMap() {
    
    const viajes = new Viajes();
}


const slides = document.querySelectorAll("img")


const nextSlide = document.querySelector("button:nth-of-type(1)")
const slideContainer = document.querySelector("main + section article");


let curSlide = 5.5

let maxSlide = slides.length - 1 + 0.5

nextSlide.addEventListener("click", function () {
    
    if (curSlide === maxSlide) {
        curSlide = 0.5
    } else {
        curSlide++
    }


    slides.forEach((slide, indx) => {
        var trans = 100 * (indx - curSlide)
        $(slide).css("transform", "translateX(" + trans + "%)")
    });
})


const prevSlide = document.querySelector("button:nth-of-type(2)")


prevSlide.addEventListener("click", function () {
 
  if (curSlide === 0.5) {
    curSlide = maxSlide
  } else {
    curSlide--
  }

  slides.forEach((slide, indx) => {
    var trans = 100 * (indx - curSlide)
    $(slide).css("transform", "translateX(" + trans + "%)")
  });
})



