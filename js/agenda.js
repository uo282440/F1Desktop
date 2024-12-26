class Agenda {

    constructor() {
        
        this.url = "https://ergast.com/api/f1/current.json";

    }

    inicializaPagina() {
        const section = $("section");

        const heading3 = document.createElement('h6');
        heading3.textContent = 'Para Warnings';
        section.append(heading3);

        
        const boton = $("<button>")
            .text("Mostrar Carreras") 
            .on("click", () => {
                boton.prop("disabled", true); 
                this.muestraInfo(); 
            });
        
        section.append(boton);
    }

    
    muestraInfo() {
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (datos) {
                console.log("Datos recibidos:", datos);
    
                const races = datos.MRData.RaceTable.Races; 
                const main = $("main");
    
                races.forEach(race => {
                    const nombreCarrera = race.raceName; 
                    const circuito = race.Circuit.circuitName; 
                    const lat = race.Circuit.Location.lat; 
                    const long = race.Circuit.Location.long; 
                    const localidad = race.Circuit.Location.locality; 
                    const pais = race.Circuit.Location.country; 
                    const fecha = race.date; 
                    const hora = race.time ? race.time.slice(0, -1) : "No especificada"; 
    
                        
                    const contenido = `
                        <article>
                            <h3>${nombreCarrera}</h3>
                            <p><strong>Circuito:</strong> ${circuito}</p>
                            <p><strong>Localización:</strong> ${localidad}, ${pais}</p>
                            <p><strong>Coordenadas:</strong> Lat ${lat}, Long ${long}</p>
                            <p><strong>Fecha y hora:</strong> ${fecha} a las ${hora}</p>
                        </article>
                    `;
    
                    
                    main.append(contenido);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error al cargar datos:", textStatus, errorThrown);
            }
        });
    }
}
    
