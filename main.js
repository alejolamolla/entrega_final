const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active') ) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {

                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = 0;
                }
                else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    }
    else {
        randomValue();
    }
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

function reiniciarJuego () {
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';
    document.querySelector('#game').innerHTML = '';
    cards = []; 
    for (let i = 0; i < totalCards; i++) { 
        let div = document.createElement('div'); 
        div.innerHTML = cardTemplate; 
        cards.push(div); 
        document.querySelector('#game').append(cards[i]); 
        randomValue(); 
        cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]); 
        cards[i].querySelectorAll('.card')[0].addEventListener('click', activate); 
    }
}

document.getElementById('botonReiniciar').addEventListener('click', reiniciarJuego);

fetch('https://api.example.com/cards')
    .then(response => response.json())
    .then(data => {

        console.log(data); 

        for (let i = 0; i < data.length; i++) {
            if (i < totalCards) {
                let div = document.createElement('div');
                div.innerHTML = cardTemplate;
                cards.push(div);
                document.querySelector('#game').append(cards[i]);
                cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
            }
        }
    })
    .catch(error => console.error('Error fetching data:', error));
