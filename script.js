const cards = document.querySelectorAll('.card');
const statusEl = document.querySelector('.status')
const restartBtn = document.querySelector('.restart');
const movesCountEl = document.querySelector('.counter')

const matchSound = new Audio('sounds/match.wav');
const failSound = new Audio('sounds/fail.wav');
const winSound = new Audio('sounds/win.mp3');

let selectedCards = [];
let matchedCards = [];

const symbols = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉',
'🍓', '🍓', '🥝', '🥝', '🍍', '🍍', '🍒', '🍒'];

let moveCount = 0;

shuffleCards();

function shuffleFisherYates(array){
   
        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        
    }


function shuffleCards(){
    const shuffledCards = shuffleFisherYates([...symbols]);

    cards.forEach((card, index) => {
        card.dataset.symbol = shuffledCards[index];
        card.textContent = '';
        card.classList.remove('matched', 'revealed');
        statusEl.textContent = '';
        movesCountEl.textContent = 'Moves: 0'
    });
}

cards.forEach(card => card.addEventListener('click', () => {

    if (card.classList.contains('revealed') || card.classList.contains('matched')){
        return;
    }
     
    if (selectedCards.length === 2){
        return;
    }

    card.textContent = card.dataset.symbol;
    
    card.classList.add('revealed');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        moveCount ++;
        movesCountEl.textContent = `Moves: ${moveCount}`
        if (selectedCards[0].dataset.symbol === selectedCards[1].dataset.symbol){
            selectedCards[0].classList.add('matched');
            selectedCards[1].classList.add('matched');
            matchedCards.push(selectedCards[0], selectedCards[1]);
            matchSound.play();
            selectedCards = [];
           
        } else {
            statusEl.textContent = 'Try again!'
            setTimeout(() => failSound.play(), 200)
            setTimeout(() => {
                selectedCards[0].classList.remove('revealed');
                selectedCards[1].classList.remove('revealed');
                statusEl.textContent = '';
                selectedCards = [];
                
            }, 2000)
     

        }
    }


    if (matchedCards.length === 16){
        statusEl.textContent = `You won using ${moveCount} moves! Click restart to start a new game!`
        winSound.play();
    }


}));

restartBtn.addEventListener('click', shuffleCards);





