
class Memoria {
    
    constructor() {

        this.hasFlippedCard = false; 
        this.lockBoard = false; 
        this.firstCard = null;
        this.secondCard = null;
        
        this.elements = [
            {
                "element": "RedBull",
                "source": "multimedia/imagenes/Red_Bull_Racing_logo.svg"
            },
            {
                "element": "McLaren",
                "source": "multimedia/imagenes/McLaren_Racing_logo.svg"
            },
            {
                "element": "Alpine",
                "source": "multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg"
            },
            {
                "element": "AstonMartin",
                "source": "multimedia/imagenes/Aston_Martin_logo.svg"
            },
            {
                "element": "Ferrari",
                "source": "multimedia/imagenes/Scuderia_Ferrari_Logo.svg"
            },
            {
                "element": "Mercedes",
                "source": "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg"
            },
            {
                "element": "RedBull",
                "source": "multimedia/imagenes/Red_Bull_Racing_logo.svg"
            },
            {
                "element": "McLaren",
                "source": "multimedia/imagenes/McLaren_Racing_logo.svg"
            },
            {
                "element": "Alpine",
                "source": "multimedia/imagenes/Alpine_F1_Team_2021_Logo.svg"
            },
            {
                "element": "AstonMartin",
                "source": "multimedia/imagenes/Aston_Martin_logo.svg"
            },
            {
                "element": "Ferrari",
                "source": "multimedia/imagenes/Scuderia_Ferrari_Logo.svg"
            },
            {
                "element": "Mercedes",
                "source": "multimedia/imagenes/Mercedes_AMG_Petronas_F1_Logo.svg"
            },
            
        ];

        this.tarjetas = [];
        this.parejasHechas = [];
    }

    
    getElements() {
        return this.elements;
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]]; 
        }
    }


    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;

        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(game) {
        if (this.firstCard.getAttribute('data-element') === this.secondCard.getAttribute('data-element')) { 
            this.disableCards(game);
        } else {
            this.unflipCards(game);
        }
    }

    disableCards(game) {
        console.log("disable");
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');

        game.resetBoard();
        
    }

    unflipCards(game) {
        console.log("unflip");
        
        game.lockBoard = true; 
        setTimeout(() => {
            this.firstCard.setAttribute('data-state', 'upside-down');
            this.secondCard.setAttribute('data-state', 'upside-down');
            game.resetBoard();
            game.lockBoard = false; 
        }, 1500);
        
    }

    addEventListeners() {
        for (let i = this.tarjetas.length -1; i >= 0; i--) {
            this.tarjetas[i].addEventListener('click', this.flipCard.bind(this.tarjetas[i], this));
        }
    }

    checkYaEmparejada(elemento) {
        for (let i = this.parejasHechas.length-1; i >= 0; i--) {
            if (this.parejasHechas[i] === elemento) {
                return true;
            }
        }
        return false;
    }

    flipCard(game) {
        
        if (game.firstCard != null && game.secondCard != null) {
            return;
        } else {
            const elemento = this.getAttribute('data-element'); 
            const estado = this.getAttribute('data-state'); 


            if (estado === 'revealed' || this.lockBoard === true || this.firstCard === this){
                return;
            }

            this.setAttribute('data-state', 'flip');

            if (game.hasFlippedCard) {
                console.log("entra 1");
                game.secondCard = this;
                game.checkForMatch(game);
            } else {
                console.log("entra 2");
                game.hasFlippedCard = true;
                game.firstCard = this;
            }
        }
    }


    createElements() {
        
        const section = document.querySelector('section > h3')?.parentElement;
        if (section) {
            this.shuffleElements();

            for (let i = this.elements.length - 1; i >= 0; i--) {
                let tarjeta = document.createElement('article');
                tarjeta.setAttribute('data-element', this.elements[i].element);
                tarjeta.setAttribute('data-state', 'upside-down');

                const heading3 = document.createElement('h6');
                heading3.textContent = 'Para Warnings ';
                tarjeta.appendChild(heading3);

                
                const front = document.createElement('section'); 

                const heading = document.createElement('h5');
                heading.textContent = 'Tarjeta de memoria';
                front.appendChild(heading);

                
                const back = document.createElement('section'); 
                const heading2 = document.createElement('h6');
                
                heading2.textContent = 'Para warnings';
                back.appendChild(heading2);

                const img = document.createElement('img');
                img.setAttribute('src', this.elements[i].source);
                img.setAttribute('alt', this.elements[i].element);
                back.appendChild(img);

                tarjeta.appendChild(front);
                tarjeta.appendChild(back);

                this.tarjetas.push(tarjeta);
                section.appendChild(tarjeta);
            }

            this.addEventListeners();
        }
        
    }
}
