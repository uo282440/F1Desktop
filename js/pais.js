class Pais {
    constructor(nombrePais, nombreCapital, cantidadPoblacion) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.cantidadPoblacion = cantidadPoblacion;
        this.rellenaAtributos();


        this.apikey = "1d7582104b063be99ff764e99231f86e";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";

        this.longitud = "-73.5226";
        this.latitud = "45.5007";
        //api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
        this.url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.latitud + "&lon=" + this.longitud + this.tipo + this.unidades + this.idioma + "&appid=" + this.apikey;
        //this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! XML recibido de <a href='https://openweathermap.org/'>OpenWeatherMap</a>"
    }

    rellenaAtributos() {
        this.nombreCircuito = "Gilles Villeneuve";
        this.formaGobierno = "Democracia";
        this.coordenadas = "45°30'02.0\"N   73°31'21.0\"W";
        this.religion = "cristianismo";
    }

    getCapital() {
        return this.nombreCapital;
    }

    getNombrePais() {
        return this.nombrePais;
    }

    getInformacionSecundaria() {
        return "<ul>" +
                    "<li> Nombre del Circuito: " + this.nombreCircuito + "</li>" +
                    "<li> Población: " + this.cantidadPoblacion + "</li>" +
                    "<li> Forma de Gobierno: " + this.formaGobierno + "</li>" +
                    "<li> Religión Mayoritaria: " + this.religion + "</li>" +
                "</ul>";
    }

    escribeCoordenadas() {
        document.write(" <ul> <li> Coordenadas: " + this.coordenadas + "</li> </ul> </section>");
    }

    escribeDocumentoMeteorologia() {
        document.write(
            "<section> <h6>Datos</h6>" +
            "<ul>" +
                "<li> Nombre del País: " + this.getNombrePais() + "</li>" +
                "<li> Capital: " + this.getCapital() + "</li>" +
            "</ul>" + 
            this.getInformacionSecundaria()
        );

        this.escribeCoordenadas();
        
    }

    crearElemento(tipoElemento, texto, insertarDespuesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarDespuesDe).after(elemento);
    }

    verXML(){
        const section = document.querySelector('section');
        

        this.crearElemento("main","","section");
        this.cargarDatos();
    }   

    cargarDatos() {
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                const fechasProcesadas = new Map(); 
                const forecast = $('time', datos);
                const main = $("main");
    
                
                forecast.each(function () {
                    const fechaHora = $(this).attr('from'); 
                    const fecha = fechaHora.split("T")[0]; 
                    const temperaturaMax = parseFloat($(this).find('temperature').attr('max'));
                    const temperaturaMin = parseFloat($(this).find('temperature').attr('min'));
    
                    if (!fechasProcesadas.has(fecha)) {
                        
                        fechasProcesadas.set(fecha, {
                            max: temperaturaMax,
                            min: temperaturaMin,
                            humedad: $(this).find('humidity').attr('value'),
                            lluvia: parseFloat($(this).find('precipitation').attr('value') || 0),
                            simbolo: $(this).find('symbol').attr('var'),
                            descripcion: $(this).find('symbol').attr('name')
                        });
                    } else {
                        
                        const datosDia = fechasProcesadas.get(fecha);
                        datosDia.max = Math.max(datosDia.max, temperaturaMax);
                        datosDia.min = Math.min(datosDia.min, temperaturaMin);
                        datosDia.lluvia += parseFloat($(this).find('precipitation').attr('value') || 0);
                        fechasProcesadas.set(fecha, datosDia);
                    }
                });
    
                
                let count = 0;
                for (const [fecha, datos] of fechasProcesadas) {
                    if (count >= 5) break;
    
                    const contenido = `
                        <h3>${fecha}</h3>
                        <p>Máx: ${datos.max.toFixed(2)}°C</p>
                        <p>Mín: ${datos.min.toFixed(2)}°C</p>
                        <p>Humedad: ${datos.humedad}%</p>
                        <p>Lluvia: ${datos.lluvia.toFixed(2)} mm</p>
                        <p>Clima: ${datos.descripcion}</p>
                        <img src="https://openweathermap.org/img/wn/${datos.simbolo}.png" alt="${datos.descripcion}">
                    `;
    
                    const article = document.createElement("article");
                    article.innerHTML = contenido;
                    main.append(article);
    
                    count++;
                }
            },
            error: function () {
                $("h3").html("No puedo obtener XML de <a href='https://openweathermap.org'>OpenWeatherMap</a>");
            }
        });
    }
    
    

    
}

