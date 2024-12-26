class Fondo {

    constructor(nombrePais, nombreCapital, nombreCircuito) {
        this.pais = nombrePais;
        this.capital = nombreCapital;
        this.circuito = nombreCircuito;
        this.img = null;
    }

    setImg(imgSeleccionada) {
        this.img = imgSeleccionada; 
    }

    setBackground() {
        if (this.img) {
            $("body").css("background-image", `url(${this.img})`);
            $("body").css("background-repeat", "no-repeat");
            $("body").css("background-size", "100vw 100vh"); 
        }
    }

    consultaAjax() {
        
        const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: this.circuito,
                    tagmode: "any",
                    format: "json"
                })
            .done((data) => { 
                $.each(data.items, (i, item) => {

                    if ( i === 1) { //mejor imagen con los tags disponibles
                        this.setImg(item.media.m);
                        this.setBackground();
                        return false;
                    }

                });
            });
    }

}
