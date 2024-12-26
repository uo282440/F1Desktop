class Circuito {

    constructor() {
        this.inicializaElementos();
    }

    
    inicializaElementos() {
        if (!this.soportaAPIFile) return; 
    
        
        const main = document.querySelector('main');
    
        
        const botonSubirArchivoXML = document.createElement('button');
        botonSubirArchivoXML.textContent = 'Subir archivo XML';
    
        const inputArchivoXML = document.createElement('input');
        inputArchivoXML.setAttribute('type', 'file');
        inputArchivoXML.setAttribute('accept', '.xml'); 
        inputArchivoXML.id = 'archivoXML'; 
    
        
        const labelXML = document.createElement('label');
        labelXML.setAttribute('for', 'archivoXML'); 
        labelXML.textContent = 'Subir archivo XML: ';
        labelXML.appendChild(botonSubirArchivoXML);
    
        
        const botonSubirArchivoKML = document.createElement('button');
        botonSubirArchivoKML.textContent = 'Subir archivo KML';
    
        const inputArchivoKML = document.createElement('input');
        inputArchivoKML.setAttribute('type', 'file');
        inputArchivoKML.setAttribute('accept', '.kml');
        inputArchivoKML.id = 'archivoKML'; 
    
        
        const labelKML = document.createElement('label');
        labelKML.setAttribute('for', 'archivoKML'); 
        labelKML.textContent = 'Subir archivo KML: ';
        labelKML.appendChild(botonSubirArchivoKML);
    
        
        const botonSubirArchivoSVG = document.createElement('button');
        botonSubirArchivoSVG.textContent = 'Subir archivo SVG';
    
        const inputArchivoSVG = document.createElement('input');
        inputArchivoSVG.setAttribute('type', 'file');
        inputArchivoSVG.setAttribute('accept', '.svg'); 
        inputArchivoSVG.id = 'archivoSVG';
    
        
        const labelSVG = document.createElement('label');
        labelSVG.setAttribute('for', 'archivoSVG'); 
        labelSVG.textContent = 'Subir archivo SVG: ';
        labelSVG.appendChild(botonSubirArchivoSVG);
    
        
        main.appendChild(labelXML);
        main.appendChild(inputArchivoXML);
        main.appendChild(labelKML);
        main.appendChild(inputArchivoKML);
        main.appendChild(labelSVG);
        main.appendChild(inputArchivoSVG);
    
        const areaVisualizacion = document.createElement('section');
        main.appendChild(areaVisualizacion); 
        let tit = document.createElement('h6');
        tit.textContent = "Vista del archivo";
        areaVisualizacion.appendChild(tit);
    
        
        botonSubirArchivoXML.addEventListener('click', () => {
            inputArchivoXML.click();
        });
    
        
        botonSubirArchivoKML.addEventListener('click', () => {
            inputArchivoKML.click();
        });
    
        
        botonSubirArchivoSVG.addEventListener('click', () => {
            inputArchivoSVG.click();
        });
    
       
        inputArchivoXML.addEventListener('change', (event) => {
            if (event.target && event.target.files.length > 0) {
                this.readInputFile(event.target.files[0], areaVisualizacion, 'xml');
            } else {
                areaVisualizacion.innerText = "No se seleccionó ningún archivo.";
            }
        });
    
        
        inputArchivoKML.addEventListener('change', (event) => {
            if (event.target && event.target.files.length > 0) {
                this.readInputFile(event.target.files[0], areaVisualizacion, 'kml');
            } else {
                areaVisualizacion.innerText = "No se seleccionó ningún archivo.";
            }
        });
    
        
        inputArchivoSVG.addEventListener('change', (event) => {
            if (event.target && event.target.files.length > 0) {
                this.readInputFile(event.target.files[0], areaVisualizacion, 'svg');
            } else {
                areaVisualizacion.innerText = "No se seleccionó ningún archivo.";
            }
        });
    
        const sections = document.querySelectorAll('section');
    
        if (sections.length > 0) {
            sections.forEach(section => {
                const warningH6 = document.createElement('h6');
                warningH6.textContent = 'Warning';
                section.insertBefore(warningH6, section.firstChild);
            });
        }
    }
    
    
    readInputFile(archivo, areaVisualizacion, tipo) {
        if (!this.soportaAPIFile) return;
    
        if (!archivo) {
            return;
        }
    
        const tipoValido = tipo === 'xml' ? /text\/xml|application\/xml/ :
                           tipo === 'kml' ? /application\/vnd.google-earth.kml\+xml/ :
                           tipo === 'svg' ? /image\/svg\+xml/ : null;
    
        if (archivo.type.match(tipoValido) || archivo.name.endsWith(`.${tipo}`)) {
            const lector = new FileReader();
    
            lector.onload = (evento) => {
                if (areaVisualizacion) {
                    const contenido = evento.target.result;
                    if (tipo === 'xml') {
                        Circuito.parsearYMostrar(contenido, areaVisualizacion);
                    } else if (tipo === 'kml') {
                        Circuito.procesarYMostrarKML(contenido, areaVisualizacion);
                    } else if (tipo === 'svg') {
                        Circuito.mostrarSVG(contenido, areaVisualizacion);
                    }
                }
            };
    
            lector.readAsText(archivo);
        } else {
            if (areaVisualizacion) {
                areaVisualizacion.innerText = `Error: El archivo seleccionado no es válido. Por favor, selecciona un archivo ${tipo.toUpperCase()}.`;
            }
        }

        const sections = document.querySelectorAll('section');

        if (sections.length > 0) {
            sections.forEach(section => {
                const warningH6 = document.createElement('h6');
                warningH6.textContent = 'Warning';
                section.insertBefore(warningH6, section.firstChild);
            });
        }
    }

    static parsearYMostrar(contenido, areaVisualizacion) {
        try {
            const xmlDoc = $.parseXML(contenido);
            const $xml = $(xmlDoc);
            const htmlContent = Circuito.xmlAHtml($xml);
            $(areaVisualizacion).empty();
            $(areaVisualizacion).append(htmlContent);
        } catch (error) {
            areaVisualizacion.innerText = `Error: ${error.message}`;
        }

        const sections = document.querySelectorAll('section');

        if (sections.length > 0) {
            sections.forEach(section => {
                const warningH6 = document.createElement('h6');
                warningH6.textContent = 'Warning';
                section.insertBefore(warningH6, section.firstChild);
            });
        }
    }

    static xmlAHtml($xml) {
        const $html = $("<article><h6>Warnings</h6></article>");
        $xml.children().each(function () {
            Circuito.procesarNodo($(this), $html);
        });
        return $html;
    }

    static procesarNodo($nodo, $contenedor) {
        const $nuevoElemento = $("<section><h6>Warnings</h6></section>");
        $nuevoElemento.append(`${$nodo.prop("nodeName")}`);
        $.each($nodo[0].attributes, function () {
            $nuevoElemento.append(` (${this.name}: ${this.value})`);
        });
        const texto = $nodo.contents().filter(function () {
            return this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() !== "";
        }).text();
        if (texto) {
            $nuevoElemento.append(`: ${texto}`);
        }
        const hijos = $nodo.children();
        if (hijos.length > 0) {
            const $subContenedor = $("<section><h6>Warnings</h6></section>");
            hijos.each(function () {
                Circuito.procesarNodo($(this), $subContenedor);
            });
            $nuevoElemento.append($subContenedor);
        }
        $contenedor.append($nuevoElemento);

        const sections = document.querySelectorAll('section');

        if (sections.length > 0) {
            sections.forEach(section => {
                const warningH6 = document.createElement('h6');
                warningH6.textContent = 'Warning';
                section.insertBefore(warningH6, section.firstChild);
            });
        }
    }


    static procesarYMostrarKML(kmlContenido, areaVisualizacion) {
        $(areaVisualizacion).empty(); 
        
        const divMapa = document.createElement('div');
        areaVisualizacion.appendChild(divMapa);
        
        
        const map = new google.maps.Map(divMapa, {
            center: { lat: 0, lng: 0 },
            zoom: 15,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            fullscreenControl: true,
        });
        
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlContenido, "application/xml");
        
        
        const coordinates = Array.from(kmlDoc.querySelectorAll("coordinates"));
        
        let puntos = [];
        
        
        coordinates.forEach(coord => {
            const coordText = coord.textContent.trim();
           
            const coords = coordText.split(' ');
        
            coords.forEach(c => {
                const [lng, lat] = c.split(',').map(Number); 
                if (!isNaN(lat) && !isNaN(lng)) { 
                    puntos.push({ lat, lng });
                }
            });
        });
        
           
        puntos.forEach(punto => {
            console.log(punto);
            new google.maps.Marker({
                position: punto,
                map: map,
            });
        });
        
        
        const ruta = new google.maps.Polyline({
            path: puntos,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        
        ruta.setMap(map);
        
        
        const bounds = new google.maps.LatLngBounds();
        puntos.forEach(punto => bounds.extend(punto));
        map.fitBounds(bounds);

        const sections = document.querySelectorAll('section');

        if (sections.length > 0) {
            sections.forEach(section => {
                const warningH6 = document.createElement('h6');
                warningH6.textContent = 'Warning';
                section.insertBefore(warningH6, section.firstChild);
            });
        }
    }
        

    get soportaAPIFile() {
        return window.File && window.FileReader && window.FileList && window.Blob;
    }

   
        static mostrarSVG(contenido, areaVisualizacion) {
            try {
                const svgElement = new DOMParser().parseFromString(contenido, 'image/svg+xml').documentElement;
        
                
                if (!svgElement.hasAttribute('viewBox')) {
                    const width = svgElement.getAttribute('width') || 100;  
                    const height = svgElement.getAttribute('height') || 100; 
                    svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
                }
        
                
                $(areaVisualizacion).empty();
                areaVisualizacion.appendChild(svgElement);
            } catch (error) {
                areaVisualizacion.innerText = `Error: ${error.message}`;
            }

            const sections = document.querySelectorAll('section');

            if (sections.length > 0) {
                sections.forEach(section => {
                    const warningH6 = document.createElement('h6');
                    warningH6.textContent = 'Warning';
                    section.insertBefore(warningH6, section.firstChild);
                });
            }
        }
        
}
