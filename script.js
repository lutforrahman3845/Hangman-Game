const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const playAgainBtn =document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figurePart = document.querySelectorAll('.figure-part');


const words = ['keyboard', 'monitor', 'programming', 'design', 'game', 'learn', 'practice'];

let selectedWord = words[Math.floor(Math.random()*words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord () {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter => `
            <span class="letter">
            ${correctLetters.includes(letter)? letter: ''}
            </span>
        `).join('')}
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if( selectedWord === innerWord){
        finalMessage.innerText = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

//update worng letter
function updateWorngletter () {

    //Display Wrong Letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>`: ''}
    ${wrongLetters.map( letters => 
        `<span>${letters}</span>`
    )}
    `;

    // Display figure
    figurePart.forEach( (part, index) => {
        const error = wrongLetters.length
        if (index < error){
            part.style.display='block';
        }else{
            part.style.display='none';
        }
    });

    //check if lost
    if (wrongLetters.length === figurePart.length) {
      setTimeout(() => {
        finalMessage.innerText = 'Unfortunately you lost.';
      popup.style.display='flex';
      }, 1000);
    }
}

//Show notification
function showNotification () {
    notification.classList.add('show');

    setTimeout( () =>{
        notification.classList.remove('show');
    }, 2000);
}

//keydown letter press
window.addEventListener('keydown', e =>{
    const letter = e.key;
    if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)) {
            correctLetters.push(letter);

            displayWord();
        }else{
            showNotification();
        }
    }else{
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);

            updateWorngletter();
        }else{
            showNotification();
        }
    }
});
displayWord();

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = words[Math.floor(Math.random() *words.length)];

    displayWord();
    updateWorngletter();
    popup.style.display='none';
});