class Noticias {
    constructor() {
        this.soportaAPIFile = null;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.soportaAPIFile = true;
        } else {
            this.soportaAPIFile = false;
            document.write("<p>Este navegador NO soporta API File</p>");
        }

        this.inicializaElementos();
    }

    inicializaElementos() {
        if (!this.soportaAPIFile) return; 


        const main = document.querySelector('main');

        const botonSubirArchivo = document.createElement('button');
        botonSubirArchivo.textContent = 'Subir archivo';

        const labelInputArchivo = document.createElement('label');
        labelInputArchivo.textContent = 'Seleccionar archivo:';
        labelInputArchivo.setAttribute('for', 'inputArchivo');  

        const inputArchivo = document.createElement('input');
        inputArchivo.setAttribute('type', 'file');
        inputArchivo.setAttribute('id', 'inputArchivo');

        
        main.appendChild(botonSubirArchivo);
        main.appendChild(labelInputArchivo);
        main.appendChild(inputArchivo);

        const areaVisualizacion = document.createElement('section');
        main.appendChild(areaVisualizacion);
        const tit = document.createElement('h6');
        tit.textContent = "Para Warnings";
        areaVisualizacion.appendChild(tit);

        
        const formulario = document.createElement('form');
        
        formulario.innerHTML = `
            <label for="titulo">Título:</label>
            <input id="titulo" required><br><br>
            <label for="cuerpo">Cuerpo de la noticia:</label>
            <textarea id="cuerpo" required></textarea><br><br>
            <label for="autor">Autor:</label>
            <input id="autor" required><br><br>
            <button>Confirmar</button>
        `;
        main.appendChild(formulario);

        
        botonSubirArchivo.addEventListener('click', () => {
            inputArchivo.click();
        });

        
        inputArchivo.addEventListener('change', (event) => {
            if (event.target && event.target.files.length > 0) {
                this.readInputFile(event.target.files[0], areaVisualizacion);
            } else {
                areaVisualizacion.innerText = "No se seleccionó ningún archivo.";
            }
        });

        
        const botonConfirmar = main.querySelector('form button');
        botonConfirmar.addEventListener('click', (event) => {
            event.preventDefault(); 
            this.agregarNoticiaManual(formulario, areaVisualizacion);
        });
    }

    readInputFile(archivo, areaVisualizacion) {
        if (!this.soportaAPIFile) return;

        if (!archivo) {
            return;
        }

        const tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            const lector = new FileReader();

            lector.onload = function (evento) {
                
                if (areaVisualizacion) {
                    const contenido = evento.target.result;
                    Noticias.parsearYMostrarNoticias(contenido, areaVisualizacion);
                }
            };

            lector.readAsText(archivo);
        } else {
            if (areaVisualizacion) {
                areaVisualizacion.innerText = "Error: El archivo seleccionado no es válido. Por favor, selecciona un archivo de texto.";
            }
        }
    }

    static parsearYMostrarNoticias(contenido, areaVisualizacion) {
        
        areaVisualizacion.innerHTML = '';
        const tit = document.createElement('h6');
        tit.textContent = "Para Warnings";
        areaVisualizacion.appendChild(tit);

        
        const noticias = contenido.split('\n');

        noticias.forEach((noticia) => {
            const partes = noticia.split('_');
            if (partes.length === 3) {
                const [titulo, cuerpo, autor] = partes;

                
                const articulo = document.createElement('article');

                const tituloElem = document.createElement('h3');
                tituloElem.textContent = titulo;

                const cuerpoElem = document.createElement('p');
                cuerpoElem.textContent = cuerpo;

                const autorElem = document.createElement('footer');
                autorElem.textContent = `Autor: ${autor}`;

                
                articulo.appendChild(tituloElem);
                articulo.appendChild(cuerpoElem);
                articulo.appendChild(autorElem);

                
                areaVisualizacion.appendChild(articulo);
            }
        });
    }

    agregarNoticiaManual(formulario, areaVisualizacion) {
        
        const tituloInput = formulario.querySelector('#titulo');
        const cuerpoTextarea = formulario.querySelector('#cuerpo');
        const autorInput = formulario.querySelector('#autor');
        
        const titulo = tituloInput.value;  
        const cuerpo = cuerpoTextarea.value;   
        const autor = autorInput.value;   

        
        if (!titulo || !cuerpo || !autor) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        
        const articulo = document.createElement('article');

        const tituloElem = document.createElement('h3');
        tituloElem.textContent = titulo;

        const cuerpoElem = document.createElement('p');
        cuerpoElem.textContent = cuerpo;

        const autorElem = document.createElement('footer');
        autorElem.textContent = `Autor: ${autor}`;

        
        articulo.appendChild(tituloElem);
        articulo.appendChild(cuerpoElem);
        articulo.appendChild(autorElem);

        
        areaVisualizacion.appendChild(articulo);

        tituloInput.value = '';  
        cuerpoTextarea.value = '';   
        autorInput.value = '';  
    }
}
