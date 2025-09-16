const cards = document.querySelectorAll('.card');
const statusEl = document.querySelector('.status')
const restartBtn = document.querySelector('.restart');

let selectedCards = [];
let matchedCards = [];

const symbols = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉',
'🍓', '🍓', '🥝', '🥝', '🍍', '🍍', '🍒', '🍒'];

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
        card.classList.remove('matched', 'revealed')
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
        if (selectedCards[0].dataset.symbol === selectedCards[1].dataset.symbol){
            selectedCards[0].classList.add('matched');
            selectedCards[1].classList.add('matched');
            matchedCards.push(selectedCards[0], selectedCards[1]);
            selectedCards = [];
           
        } else {
            statusEl.textContent = 'Try again!'
            setTimeout(() => {
                selectedCards[0].classList.remove('revealed');
                selectedCards[1].classList.remove('revealed');
                statusEl.textContent = '';
                selectedCards = [];
                
            }, 2000)
     

        }
    }


    if (matchedCards.length === 16){
        statusEl.textContent = 'You won! Click restart to start a new game!'
    }


}));

restartBtn.addEventListener('click', shuffleCards);





