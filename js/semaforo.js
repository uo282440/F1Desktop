
class Semaforo {

    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clickMoment = null;

        const numeroAleatorio = Math.floor(Math.random() * 3);
        this.difficulty = this.levels[numeroAleatorio];

        this.focos = [];
        this.botonInicio = null;
        this.botonFinal = null;


        this.nombre = null;
        this.apellidos = null;
        this.nivel = null;
        this.tiempo = null;
    }

    

    initSequence() {
        this.botonFinal.disabled = false;

        for (let i = 0; i < this.focos.length; i++) {
            
            setTimeout(() => {
                this.focos[i].classList.add('load');
            }, 250 * (i+ (i*i/2)));
        }

        setTimeout(() => {
            this.unload_moment = new Date();
            this.EndSequence();
        }, 4000 + this.difficulty*100);
        
    }

    EndSequence() {
        for (let i = 0; i < this.focos.length; i++) {
            this.focos[i].classList.add('unload');
        }

        this.botonFinal.addEventListener('click', () => this.stopReaction());
    }

    stopReaction() {
        this.clickMoment = new Date();
        let t = this.clickMoment - this.unload_moment;

        
        for (let i = 0; i < this.focos.length; i++) {
            this.focos[i].classList.remove('unload');
            this.focos[i].classList.remove('load');
        }

        this.botonFinal.disabled = true;
        this.botonInicio.disabled = false;

        this.createRecordForm(t);//crea y "pinta" el formulario en el html
        
    }

    addListeners(botonA) {
        botonA.addEventListener('click', () => this.initSequence());
    }
    
    createStructure() {
        const mainSection = document.querySelector('main');

        if (mainSection) {
            let titulo = document.createElement("h3");

            
            titulo.textContent = "Semáforo";
            mainSection.appendChild(titulo);

            let semaforo = document.createElement("section");

            const heading3 = document.createElement('h6');
            heading3.textContent = 'Para Warnings';
            semaforo.appendChild(heading3);

            mainSection.appendChild(semaforo);
            for (let i = 0; i < this.lights; i++) {
                let foco = document.createElement("div");

                semaforo.appendChild(foco);
                this.focos.push(foco);
            }


            let botones = document.createElement("section");

            const heading4 = document.createElement('h6');
            heading4.textContent = 'Para Warnings';
            botones.appendChild(heading4);



            let boton1 = document.createElement("button");
            this.botonInicio = boton1;
            this.addListeners(boton1);
            boton1.textContent = "Arranque";
            let boton2 = document.createElement("button");
            this.botonFinal = boton2;
            boton2.textContent = "Reacción";

            botones.appendChild(boton1);
            botones.appendChild(boton2);
            mainSection.appendChild(botones);


            let seccionFormulario = document.createElement('article');
            const heading5 = document.createElement('h6');
            heading5.textContent = 'Para Warnings';
            seccionFormulario.appendChild(heading5);

            mainSection.appendChild(seccionFormulario);

        }
    }


    createRecordForm(tiempo) {

        const mainSection = document.querySelector('main'); 
        const seccionFormulario = document.querySelector('article');

        seccionFormulario.innerHTML = ''; //vacio el anterio formulario
        
        
        const heading3 = document.createElement('h6');
        heading3.textContent = 'Para Warnings';
        seccionFormulario.appendChild(heading3);
    
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'semaforo.php';

        
        
        const nombreLabel = document.createElement('label');
        nombreLabel.textContent = 'Nombre:';
        const nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        nombreInput.name = 'nombre';
        form.appendChild(nombreLabel);
        form.appendChild(nombreInput);
    
        
        const apellidosLabel = document.createElement('label');
        apellidosLabel.textContent = 'Apellidos:';
        const apellidosInput = document.createElement('input');
        apellidosInput.type = 'text';
        apellidosInput.name = 'apellidos';
        form.appendChild(apellidosLabel);
        form.appendChild(apellidosInput);
    
        
        const nivelLabel = document.createElement('label');
        nivelLabel.textContent = 'Nivel:';
        const nivelInput = document.createElement('input');
        nivelInput.type = 'text';
        nivelInput.name = 'nivel';
        nivelInput.value = this.difficulty; 
        nivelInput.readOnly = true;
        form.appendChild(nivelLabel);
        form.appendChild(nivelInput);
    
        
        const tiempoLabel = document.createElement('label');
        tiempoLabel.textContent = 'Tiempo de Reacción:';

        const tiempoInput = document.createElement('input');
        tiempoInput.type = 'text';
        tiempoInput.name = 'tiempo';
        tiempoInput.value = tiempo; 
        tiempoInput.readOnly = true;
        form.appendChild(tiempoLabel);
        form.appendChild(tiempoInput);
    
        
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Enviar';
        form.appendChild(submitButton);
    
        seccionFormulario.appendChild(form);
        mainSection.appendChild(seccionFormulario);

    

        form.addEventListener('submit', function(event) {

            submitButton.disabled = true;
        });

    }

}