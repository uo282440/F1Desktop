class Trivia {
    
    constructor() {
        this.circuits = [
            { name: "Circuit de Monaco", lat: 43.7347, lon: 7.4206 },
            { name: "Silverstone Circuit", lat: 52.0786, lon: -1.0169 },
            { name: "Monza Circuit", lat: 45.6190, lon: 9.2811 },
            { name: "Suzuka Circuit", lat: 34.8431, lon: 136.5411 },
            { name: "Interlagos (São Paulo)", lat: -23.7036, lon: -46.6997 },
            { name: "Circuit of the Americas", lat: 30.1328, lon: -97.6411 },
            { name: "Yas Marina Circuit", lat: 24.4672, lon: 54.6031 },
            { name: "Circuit de Barcelona-Catalunya", lat: 41.5693, lon: 2.2583 },
            { name: "Circuit Gilles Villeneuve", lat: 45.5048, lon: -73.5267 },
            { name: "Red Bull Ring", lat: 47.2197, lon: 14.7647 },
            { name: "Spa-Francorchamps", lat: 50.4372, lon: 5.9714 },
            { name: "Hungaroring", lat: 47.5789, lon: 19.2486 }
        ];

        this.triviaData = {
            "Circuit de Monaco": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "19" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1929" },
                { question: "¿Cuál es el largo total del circuito?", answer: "3.337 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Montecarlo" },
                { question: "¿Qué famoso evento se celebra aquí cada año?", answer: "Gran Premio de Mónaco" }
            ],
            "Silverstone Circuit": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "18" },
                { question: "¿En qué año se celebró el primer Gran Premio de Silverstone?", answer: "1950" },
                { question: "¿Qué equipo de F1 tiene su sede cerca de este circuito?", answer: "Mercedes" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "5.891 km" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Gran Bretaña" }
            ],
            "Monza Circuit": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "11" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1922" },
                { question: "¿Cuál es el largo total del circuito?", answer: "5.793 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Monza" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Italia" }
            ],
            "Suzuka Circuit": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "18" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1962" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "5.807 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Suzuka" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Japón" }
            ],
            "Interlagos (São Paulo)": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "15" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1940" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "4.309 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "São Paulo" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Brasil" }
            ],
            "Circuit of the Americas": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "20" },
                { question: "¿En qué año se inauguró el circuito?", answer: "2012" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "5.513 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Austin" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de los Estados Unidos" }
            ],
            "Yas Marina Circuit": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "21" },
                { question: "¿En qué año se inauguró el circuito?", answer: "2009" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "5.554 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Abu Dabi" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Abu Dabi" }
            ],
            "Circuit de Barcelona-Catalunya": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "16" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1991" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "4.675 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Barcelona" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de España" }
            ],
            "Circuit Gilles Villeneuve": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "14" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1978" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "4.361 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Montreal" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Canadá" }
            ],
            "Red Bull Ring": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "10" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1996" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "4.318 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Spielberg" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Austria" }
            ],
            "Spa-Francorchamps": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "20" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1921" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "7.004 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Spa" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Bélgica" }
            ],
            "Hungaroring": [
                { question: "¿Cuántas curvas tiene el circuito?", answer: "14" },
                { question: "¿En qué año se inauguró el circuito?", answer: "1986" },
                { question: "¿Cuál es la longitud total del circuito?", answer: "4.381 km" },
                { question: "¿En qué ciudad se encuentra el circuito?", answer: "Budapest" },
                { question: "¿Qué evento se celebra aquí cada año?", answer: "Gran Premio de Hungría" }
            ]
        };
    }

    getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // radio de la tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    findNearestCircuit(userLat, userLon) {
        let nearestCircuit = null;
        let shortestDistance = Infinity;

        this.circuits.forEach(circuit => {
            const distance = this.getDistance(userLat, userLon, circuit.lat, circuit.lon);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestCircuit = circuit;
            }
        });

        return nearestCircuit;
    }

    mostrarCircuitoMasCercano() {
        let parrafo = document.createElement('p');
        let section = document.querySelector('section');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;

                const nearestCircuit = this.findNearestCircuit(userLat, userLon);

                if (nearestCircuit) {
                    parrafo.textContent = nearestCircuit.name;
                    section.appendChild(parrafo);

                    this.comenzarTrivia(nearestCircuit.name);  

                } else {
                    parrafo.textContent = 'No se pudo encontrar un circuito cercano';
                    section.appendChild(parrafo);
                }
            }, error => {
                console.error("Error al obtener la geolocalización: ", error);
                alert("No se pudo obtener la ubicación. Verifique los permisos de geolocalización.");
            });
        } else {
            alert("La geolocalización no está soportada en este navegador.");
        }
    }

    comenzarTrivia(circuitName) {
        const triviaQuestions = this.triviaData[circuitName];

        if (!triviaQuestions) {
            alert('No hay preguntas de trivia disponibles para este circuito.');
            return;
        }

        let section = document.querySelector('section');
        triviaQuestions.forEach((q, index) => {
            let questionSection = document.createElement('section');
            //let questionText = document.createElement('p');
            
            let label = document.createElement('label');
            label.setAttribute('for', `answer-${index}`);
            label.textContent = `${index + 1}. ${q.question}`;
            questionSection.appendChild(label);
            
            //questionText.textContent = q.question;
            //questionSection.appendChild(questionText);

            let answerInput = document.createElement('input');
            answerInput.id = `answer-${index}`;
            answerInput.type = 'text';
            answerInput.placeholder = 'Respuesta corta';
            questionSection.appendChild(answerInput);

            section.appendChild(questionSection);
        });

        this.loadAnswers(circuitName);

        let submitButton = document.createElement('button');
        submitButton.textContent = 'Enviar respuestas';
        submitButton.onclick = () => {
            this.saveAnswers(circuitName);
        };
        section.appendChild(submitButton);
    }

    saveAnswers(circuitName) {
        const triviaQuestions = this.triviaData[circuitName];
        const userAnswers = [];

        const inputs = document.querySelectorAll('section input');
        inputs.forEach((input, index) => {
            userAnswers.push(input.value.trim());
        });

        let correctAnswers = 0;

        triviaQuestions.forEach((q, index) => {
            if (userAnswers[index].toLowerCase() === q.answer.toLowerCase()) {
                correctAnswers++;
            }
        });

        localStorage.setItem(`trivia_answers_${circuitName}`, JSON.stringify(userAnswers));

        this.showResults(correctAnswers, triviaQuestions.length);

        let section = document.querySelector('section');
        let texto = document.createElement('p');
        texto.textContent = 'Respuestas guardadas correctamente';
        section.appendChild(texto);

        this.subeMasInfo();
    }

    subeMasInfo() {
        let section = document.querySelector('section');

        let infoSubirArchivo = document.createElement('h3');
        infoSubirArchivo.textContent = 'Sube más informacion sobre este Circuito para mostrarla en pantalla';
        section.appendChild(infoSubirArchivo);

        const inputArchivo = document.createElement('input');
        inputArchivo.setAttribute('type', 'file');
        section.appendChild(inputArchivo);

        const areaVisualizacion = document.createElement('section');
        section.appendChild(areaVisualizacion);

        let tit = document.createElement('h3');
        tit.textContent = 'Información Extra del Circuito';
        areaVisualizacion.appendChild(tit);

        inputArchivo.addEventListener('change', (event) => {
            if (event.target && event.target.files.length > 0) {
                this.readInputFile(event.target.files[0], areaVisualizacion);
            } else {
                areaVisualizacion.innerText = "No se seleccionó ningún archivo.";
            }
        });
    }

    readInputFile(archivo, areaVisualizacion) {
        if (!archivo) {
            return;
        }

        const tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) {
            const lector = new FileReader();

            lector.onload = function (evento) {
                if (areaVisualizacion) {
                    const contenido = evento.target.result;
                    console.log(contenido);
                    let parrafo = document.createElement('p');
                    parrafo.textContent = contenido;
                    areaVisualizacion.appendChild(parrafo);
                }
            };

            lector.readAsText(archivo);
        } else {
            if (areaVisualizacion) {
                areaVisualizacion.innerText = "Error: El archivo seleccionado no es válido. Por favor, selecciona un archivo de texto.";
            }
        }
    }

    showResults(correctAnswers, totalQuestions) {
        let section = document.querySelector('section');
        let resultSection = document.createElement('section');
        let resultMessage = document.createElement('p');

        let resultH = document.createElement('h6');
        resultH.textContent = 'Para Warnings';
        resultSection.appendChild(resultH);
        resultMessage.textContent = `Has acertado ${correctAnswers} de ${totalQuestions} preguntas.`;
        resultSection.appendChild(resultMessage);
        section.appendChild(resultSection);
    }

    loadAnswers(circuitName) {
        const storedAnswers = localStorage.getItem(`trivia_answers_${circuitName}`);
        if (storedAnswers) {
            const answers = JSON.parse(storedAnswers);
            const inputs = document.querySelectorAll('section input');
            inputs.forEach((input, index) => {
                if (answers[index]) {
                    input.value = answers[index];
                }
            });
            console.log("Respuestas cargadas: ", answers);
        } else {
            console.log("No hay respuestas guardadas");
        }
    }
}
